import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { Tag } from './tag';
import { TagService } from './tag.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {

  tagForm: FormGroup;
  nameControl: FormControl;
  descriptionControl: FormControl;
  iconControl: FormControl;
  colorControl: FormControl;

  title: string;
  buttonLabel: string;

  colors: Array<string> = [
    '#576E99',
    '#206CFF',
    '#0000CC',
    '#5229A3',
    '#854F61',
    '#B5074C',
    '#CC0000',
    '#D85349',
    '#FF4B14',
    '#EC7000',
    '#B36D00',
    '#AB8B00',
    '#636330',
    '#64992C',
    '#03BC06',
    '#006633'
  ];

  icons: Array<string> = [
    'euro',
    'glass',
    'music',
    'film',
    'home',
    'road',
    'earphone',
    'book',
    'camera',
    'facetime-video',
    'gift',
    'plane',
    'shopping-cart',
    'hdd',
    'globe',
    'wrench',
    'paperclip',
    'phone',
    'flash',
    'cutlery',
    'tower',
    'tree-conifer',
    'tree-deciduous',
    'cd',
    'baby-formula',
    'tent',
    'blackboard',
    'bed',
    'lamp',
    'piggy-bank',
    'scale',
    'education',
    'oil',
    'sunglasses'
  ];

  private tag: Tag;
  private newTag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tagService: TagService,
    private alertService: AlertService) {
  }

  // TODO : ngOnInit pas reexecute lors d'un changement de parametres : http://stackoverflow.com/questions/38357826/angular-rc3-router-navigating-to-same-page-with-different-parameters
  ngOnInit() {

    // Init tag
    if (this.route.snapshot.data['tag']) {
      this.tag = this.route.snapshot.data['tag'];
    } else {
      this.tag = new Tag();
    }

    // Create form
    this.nameControl = this.formBuilder.control(this.tag.name, [ Validators.required, Validators.maxLength(50) ]);
    this.descriptionControl = this.formBuilder.control(this.tag.description, [ Validators.required, Validators.maxLength(250) ]);
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

    // Set title & button label
    if (this.isNew()) {
      this.title = 'Création d\'une catégorie';
      this.buttonLabel = 'Créer';
    } else {
      this.title = 'Modification de la catégorie';
      this.buttonLabel = 'Modifier';
    }
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
