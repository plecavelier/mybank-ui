import { Component, OnInit, Host, Input } from '@angular/core';
import { FormGroupDirective, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {

  @Input('control') controlName: string;
  @Input() error: string;
  control: AbstractControl;

  constructor(@Host() private formGroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.control = this.formGroupDirective.form.get(this.controlName);
  }

  isDisplayed(): boolean {
    return this.control.dirty && this.control.hasError(this.error);
  }
}
