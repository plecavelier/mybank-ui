import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { OperationService } from './operation.service';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.css']
})
export class ImportFormComponent implements OnInit {

  importForm: FormGroup;
  contentControl: FormControl;

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
          this.alertService.emit(new Alert('success', 'Les opérations ont bien été importées'));
          //this.importForm.reset()
        },
        error => this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant l\'import des opérations'))
      );
  }
}
