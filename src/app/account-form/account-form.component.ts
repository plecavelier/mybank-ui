import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormErrorComponent } from '../form-error/form-error.component';
import 'rxjs/add/operator/toPromise';

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

  constructor(private _fb: FormBuilder, private _http: Http) { }

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
    let body = JSON.stringify(this.accountForm.value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // php.ini must be contains option always_populate_raw_post_data = -1
    this._http.post('http://127.0.0.1:8000/accounts', body, options)
      .toPromise()
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
}
