import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { FormErrorComponent } from '../form-error/form-error.component';
import 'rxjs/add/operator/toPromise';
import { AccountService } from '../account.service'
import { Account } from '../account'

@Component({
  moduleId: module.id,
  selector: 'app-account-form',
  templateUrl: 'account-form.component.html',
  styleUrls: ['account-form.component.css'],
  directives: [ REACTIVE_FORM_DIRECTIVES, FormErrorComponent ],
  providers: [AccountService]
})
export class AccountFormComponent implements OnInit {

  public accountForm: FormGroup;
  public nameControl: FormControl;
  public numberControl: FormControl;
  public balanceControl: FormControl;
  public detailsControl: FormControl;

  private account: Account;

  constructor(private _fb: FormBuilder, private _http: Http, private _route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {

    this.account = new Account();
    this.account.name = "";
    this.account.number = "";
    this.account.balance = 0;
    this.account.details = "";

    this.nameControl = this._fb.control(this.account.name, Validators.required);
    this.numberControl = this._fb.control(this.account.number, Validators.required);
    this.balanceControl = this._fb.control(this.account.balance, [ Validators.required, Validators.pattern('^[0-9]+([.][0-9]{0,2})?$') ]);
    this.detailsControl = this._fb.control(this.account.details);
    this.accountForm = this._fb.group({
      name : this.nameControl,
      number : this.numberControl,
      balance : this.balanceControl,
      details : this.detailsControl
    });

    this.accountForm.valueChanges.subscribe(value => {
      this.account.name = value.name;
      this.account.number = value.number;
      this.account.balance = value.balance;
      this.account.details = value.details;
    });

    // TODO : use resolver to load datas before view : http://stackoverflow.com/questions/34731869/wait-for-angular-2-to-load-resolve-model-before-rendering-view-template
    this._route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (id) {
          this.accountService.get(id).subscribe(
            account => {
              this.account = account;
              this.accountForm.patchValue(account);
            },
            error => {
              console.error(error)
            }
          );
        }
      });
  }

  ngSubmit() {
    this.accountService.save(this.account)
      .subscribe(
        response => {
          console.log(response);
        },
        error => console.error(error)
      );
  }
}
