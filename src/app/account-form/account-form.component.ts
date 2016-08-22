import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  moduleId: module.id,
  selector: 'app-account-form',
  templateUrl: 'account-form.component.html',
  styleUrls: ['account-form.component.css'],
  directives: [ REACTIVE_FORM_DIRECTIVES, FormErrorComponent ]
})
export class AccountFormComponent implements OnInit {

  public accountForm: FormGroup;
  public name: FormControl;
  public number: FormControl;
  public balance: FormControl;
  public details: FormControl;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.name = this._fb.control("", Validators.required);
    this.number = this._fb.control("", Validators.required);
    this.balance = this._fb.control(0, [ Validators.required, Validators.pattern('^[0-9]+([.,][0-9]{0,2})?$') ]);
    this.details = this._fb.control("");
    this.accountForm = this._fb.group({
      "name" : this.name,
      "number" : this.number,
      "balance" : this.balance,
      "details" : this.details
    });
  }

  ngSubmit() {
    console.log(this.accountForm.value);
  }
}
