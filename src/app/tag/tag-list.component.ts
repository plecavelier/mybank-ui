import { Component, OnInit } from '@angular/core';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { FilterService } from '../dashboard/filter.service';
import { Tag } from './tag';
import { TagService } from './tag.service';

@Component({
  selector: 'ul[app-tag-list]',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  tags: Array<Tag>;
  selectedTags: Array<Tag> = [];

  constructor(
    private tagService: TagService,
    private alertService: AlertService,
    private filterService: FilterService) {
  }

  ngOnInit() {
    this.tagService.tagChanged$.subscribe(
      tag => this.refreshList()
    );
    this.refreshList();
  }

  private refreshList() {
    this.tagService.getAll().subscribe(
      tags => this.tags = tags,
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des catégories'))
    );
  }

  toggleTag(tag: Tag) {
    let index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.filterService.updateTags(this.selectedTags);
  }

  isSelected(tag: Tag) {
    return this.selectedTags.indexOf(tag) > -1;
  }

  deleteTag(tag: Tag) {
    if (confirm('Souhaitez-vous vraiment supprimer cette catégorie ?')) {
      this.tagService.delete(tag).subscribe(
        response => this.alertService.emit(new Alert('success', 'La catégorie a bien été supprimé')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression de la catégorie'))
      );
    }
  }
}
