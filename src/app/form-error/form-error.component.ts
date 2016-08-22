import { Component, OnInit, Host, Input } from '@angular/core';
import { FormGroupDirective, FormControl, AbstractControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-form-error',
  templateUrl: 'form-error.component.html',
  styleUrls: ['form-error.component.css']
})
export class FormErrorComponent implements OnInit {

  @Input('control') controlName: string;
  @Input() error: string;
  control: AbstractControl;

  constructor(@Host() private formGroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.control = this.formGroupDirective.form.find(this.controlName);
  }

  isDisplayed() {
    return this.control.dirty && this.control.hasError(this.error);
  }
}
