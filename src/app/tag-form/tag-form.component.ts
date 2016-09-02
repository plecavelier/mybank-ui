import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormErrorComponent } from '../form-error/form-error.component';
import { TagService } from '../tag.service';
import { AlertService } from '../alert.service';
import { Tag } from '../tag';
import { Alert } from '../alert';

@Component({
  moduleId: module.id,
  selector: 'app-tag-form',
  templateUrl: 'tag-form.component.html',
  styleUrls: ['tag-form.component.css'],
  directives: [ REACTIVE_FORM_DIRECTIVES, FormErrorComponent ]
})
export class TagFormComponent implements OnInit {

  tagForm: FormGroup;
  nameControl: FormControl;
  descriptionControl: FormControl;
  iconControl: FormControl;
  colorControl: FormControl;

  private tag: Tag;
  private newTag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tagService: TagService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    if (this.route.snapshot.data['tag']) {
      this.tag = this.route.snapshot.data['tag'];
    } else {
      this.tag = new Tag();
    }

    this.nameControl = this.formBuilder.control(this.tag.name, Validators.required);
    this.descriptionControl = this.formBuilder.control(this.tag.description, Validators.required);
    this.iconControl = this.formBuilder.control(this.tag.icon, Validators.required);
    this.colorControl = this.formBuilder.control(this.tag.color, Validators.required);
    let controls = {
      name : this.nameControl,
      description : this.descriptionControl,
      icon : this.iconControl,
      color : this.colorControl
    }
    this.tagForm = this.formBuilder.group(controls);

    this.tagForm.valueChanges.subscribe(value => {
      this.tag.name = value.name;
      this.tag.description = value.description;
      this.tag.icon = value.icon;
      this.tag.color = value.color;
    });
  }

  saveTag() {
    if (this.isNew()) {
      this.tagService.save(this.tag)
        .subscribe(
          response => {
            this.alertService.emit(new Alert('success', 'La catégorie a bien été créée'));
            this.clearForm();
          },
          error => this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la création de la catégorie'))
        );
    } else {
      this.tagService.update(this.tag)
        .subscribe(
          response => this.alertService.emit(new Alert('success', 'La catégorie a bien été modifiée')),
          error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la modification de la catégorie'))
        );
    }
  }

  isNew(): boolean {
    return this.tag.id === undefined;
  }

  private clearForm() {
    this.tagForm.reset();
    this.tag = new Tag();
    this.tagForm.patchValue(this.tag);
  }
}
