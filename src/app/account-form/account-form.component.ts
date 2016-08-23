import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private _fb: FormBuilder, private _http: Http, private _route: ActivatedRoute) { }

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

    // TODO : use resolver to load datas before view : http://stackoverflow.com/questions/34731869/wait-for-angular-2-to-load-resolve-model-before-rendering-view-template
    this._route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this._http.get('http://127.0.0.1:8000/accounts/' + id, {})
            .map(response => response.json())
            .toPromise()
            .then(response => {
              this.name.setValue(response.name);
              this.number.setValue(response.number);
            })
            .catch(error => console.error(error));
        }
      });
  }

  ngSubmit() {
    // TODO : use observables
    // TODO : migrate to service with account model
    this._http.post('http://127.0.0.1:8000/accounts', this.accountForm.value)
      .toPromise()
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
}
