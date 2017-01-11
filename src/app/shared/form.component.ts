import { Component, OnChanges, Host, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { ModelType } from './model-type';
import { RestService } from './rest.service';
import { Alert } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent<T> implements OnChanges {

  @Input() model: T;
  @Input() type: ModelType<T>;
  @Input() service: RestService<T, ModelType<T>>;
  @Output() success = new EventEmitter();
  attributes;
  alerts: Alert[] = [];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
  }

  ngOnChanges() {

    // Create form
    if (!this.form) {
      this.attributes = this.type.attributes();

      let controls = {};
      this.attributes.forEach((attr, n) => {
        if (this.includeAttribute(attr)) {
          let control = this.formBuilder.control(null, attr.validators);
          controls[attr.key] = control;
        }
      });
      this.form = this.formBuilder.group(controls);
    }

    if (!this.model) {
      this.model = this.type.factory();
    }

    // Set model values in form
    this.attributes.forEach((attr, n) => {
      if (this.includeAttribute(attr)) {
        this.form.get(attr.key).setValue(this.model[attr.key]);
      }
    });
  }

  isNew(): boolean {
    return !this.model || !this.model.hasOwnProperty('id');
  }

  includeAttribute(attr): boolean {
    return 'fieldType' in attr && (
      !('onlyNew' in attr) || !attr.onlyNew || (attr.onlyNew && this.isNew())
    );
  }

  persist() {
    // Create model to persist
    let modelToPersist: T = Object.assign({}, this.model);
    this.attributes.forEach((attr, n) => {
      if (this.includeAttribute(attr)) {
        modelToPersist[attr.key] = this.form.get(attr.key).value;
      }
    });

    // Persist with service
    if (this.isNew()) {
      this.service.save(modelToPersist)
        .subscribe(
          response => {
            this.success.emit();
            this.alertService.emit(new Alert('success', 'La création a bien été effectuée'));
          }, error => {
            this.alerts.push(new Alert('danger', 'Une erreur est survenue durant la création'));
          }
        );
    } else {
      this.service.update(modelToPersist)
        .subscribe(
          response => {
            this.success.emit();
            this.alertService.emit(new Alert('success', 'La modification a bien été effectuée'));
          }, error => {
            this.alerts.push(new Alert('danger', 'Une erreur est survenue durant la modification'));
          }
        );
    }
  }

  closeAlert(alert: Alert) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
