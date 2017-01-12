import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { FilterService } from '../dashboard/filter.service';
import { Tag } from './tag';
import { TagService } from './tag.service';
import { TagType } from './tag-type';

@Component({
  selector: 'ul[app-tag-list]',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {

  @Input() tags: Tag[];
  selectedTags: Tag[] = [];
  tagType: TagType = new TagType();
  tagToEdit: Tag;
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(
    private tagService: TagService,
    private alertService: AlertService,
    private filterService: FilterService,
    private route: ActivatedRoute) {
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

  editTag(tag: Tag) {
    this.tagToEdit = tag;
    this.editModal.show();
  }

  deleteTag(tag: Tag) {
    if (confirm('Souhaitez-vous vraiment supprimer cette catégorie ?')) {
      this.tagService.delete(tag).subscribe(
        response => this.alertService.emit(new Alert('success', 'La catégorie a bien été supprimée')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression de la catégorie'))
      );
    }
  }
}
