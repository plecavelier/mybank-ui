import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service'
import { AlertService } from '../alert.service'
import { Tag } from '../tag'
import { Alert } from '../alert'

@Component({
  moduleId: module.id,
  selector: 'ul[app-tag-list]',
  templateUrl: 'tag-list.component.html',
  styleUrls: ['tag-list.component.css']
})
export class TagListComponent implements OnInit {

  tags: Array<Tag>;

  constructor(
    private tagService: TagService,
    private alertService: AlertService) {
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

  deleteTag(tag: Tag) {
    if (confirm('Souhaitez-vous vraiment supprimer cette catégorie ?')) {
      this.tagService.delete(tag).subscribe(
        response => this.alertService.emit(new Alert('success', 'La catégorie a bien été supprimé')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression de la catégorie'))
      );
    }
  }
}
