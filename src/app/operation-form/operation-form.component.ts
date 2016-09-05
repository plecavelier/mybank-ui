import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormErrorComponent } from '../form-error/form-error.component';
import { OperationService } from '../operation.service';
import { AlertService } from '../alert.service';
import { Operation } from '../operation';
import { Alert } from '../alert';

@Component({
  moduleId: module.id,
  selector: 'app-operation-form',
  templateUrl: 'operation-form.component.html',
  styleUrls: ['operation-form.component.css'],
  directives: [ REACTIVE_FORM_DIRECTIVES, FormErrorComponent ]
})
export class OperationFormComponent implements OnInit {

  operationForm: FormGroup;
  nameControl: FormControl;
  descriptionControl: FormControl;
  dateControl: FormControl;
  amountControl: FormControl;

  title: string;
  buttonLabel: string;

  private operation: Operation;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private operationService: OperationService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    // Init operation
    console.log(this.route.snapshot.data['operation']);
    if (this.route.snapshot.data['operation']) {
      this.operation = this.route.snapshot.data['operation'];
    } else {
      this.operation = new Operation();
    }

    // Create form
    this.nameControl = this.formBuilder.control(this.operation.name, [ Validators.required, Validators.maxLength(50) ]);
    this.descriptionControl = this.formBuilder.control(this.operation.description, [ Validators.maxLength(250) ]);
    let dateString = this.operation.date === undefined ? null : this.operation.date.toISOString().substring(0, 10);
    this.dateControl = this.formBuilder.control(dateString, [ Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$') ]);
    this.amountControl = this.formBuilder.control(this.operation.amount, [ Validators.required, Validators.pattern('^[0-9]+([.][0-9]{0,2})?$') ]);
    let controls = {
      name : this.nameControl,
      description : this.descriptionControl,
      date : this.dateControl,
      amount: this.amountControl
    }
    this.operationForm = this.formBuilder.group(controls);

    this.operationForm.valueChanges.subscribe(value => {
      this.operation.name = value.name;
      this.operation.description = value.description;
      this.operation.date = new Date(value.date);
      this.operation.amount = value.amount;
    });

    // Set title & button label
    if (this.isNew()) {
      this.title = 'Création d\'une opération';
      this.buttonLabel = 'Créer';
    } else {
      this.title = 'Modification de l\'opération';
      this.buttonLabel = 'Modifier';
    }
  }

  saveOperation() {
    if (this.isNew()) {
      this.operationService.save(this.operation)
        .subscribe(
          response => {
            this.alertService.emit(new Alert('success', 'L\'opération a bien été créée'));
            this.clearForm();
          },
          error => this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la création de l\'opération'))
        );
    } else {
      this.operationService.update(this.operation)
        .subscribe(
          response => this.alertService.emit(new Alert('success', 'L\'opération a bien été modifiée')),
          error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la modification de l\'opération'))
        );
    }
  }

  isNew(): boolean {
    return this.operation.id === undefined;
  }

  private clearForm() {
    this.operationForm.reset();
    this.operation = new Operation();
    this.operationForm.patchValue(this.operation);
    let dateString = this.operation.date === undefined ? null : this.operation.date.toISOString().substring(0, 10);
    this.operationForm.controls['date'].setValue(dateString);
  }
}
