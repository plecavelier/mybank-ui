import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { OperationService } from './operation.service';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.scss']
})
export class ImportFormComponent implements OnInit {

  importForm: FormGroup;
  contentControl: FormControl;
  alerts: Alert[] = [];
  @Output() success = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private operationService: OperationService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    // Create form
    this.contentControl = this.formBuilder.control('', [ Validators.required ]);
    let controls = {
      content : this.contentControl
    }
    this.importForm = this.formBuilder.group(controls);
  }

  importOperation() {
    this.operationService.import(this.importForm.value.content)
      .subscribe(
        response => {
          this.importForm.reset();
          this.success.emit();
          this.alertService.emit(new Alert('success', 'Les opérations ont bien été importées'));
        },
        error => {
          this.alerts.push(new Alert('danger', 'Une erreur est survenue durant l\'import des opérations'));
        }
      );
  }
}
