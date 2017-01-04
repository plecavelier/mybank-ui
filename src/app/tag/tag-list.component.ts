import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { FilterService } from '../dashboard/filter.service';
import { Tag } from './tag';
import { TagService } from './tag.service';

@Component({
  selector: 'ul[app-tag-list]',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit, OnDestroy {

  tags: Array<Tag>;
  selectedTags: Array<Tag> = [];
  tagChangedSubscription: Subscription;

  constructor(
    private tagService: TagService,
    private alertService: AlertService,
    private filterService: FilterService) {
  }

  ngOnInit() {
    this.tagChangedSubscription = this.tagService.changed$.subscribe(
      tag => this.refreshList()
    );
    this.refreshList();
  }

  ngOnDestroy() {
    this.tagChangedSubscription.unsubscribe();
  }

  private refreshList() {
    this.tagService.getAll().subscribe(
      tags => this.tags = tags,
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des catégories'))
    );
  }

  toggleTag(tag: Tag) {
    let index = this.selectedTags.findIndex(current => current.id == tag.id);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.filterService.updateTags(this.selectedTags);
  }

  isSelected(tag: Tag) {
    return this.selectedTags.findIndex(current => current.id == tag.id) > -1;
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
