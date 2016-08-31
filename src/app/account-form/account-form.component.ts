import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormErrorComponent } from '../form-error/form-error.component';
import { AccountService } from '../account.service';
import { AlertService } from '../alert.service';
import { Account } from '../account';
import { Alert } from '../alert';

@Component({
  moduleId: module.id,
  selector: 'app-account-form',
  templateUrl: 'account-form.component.html',
  styleUrls: ['account-form.component.css'],
  directives: [ REACTIVE_FORM_DIRECTIVES, FormErrorComponent ]
})
export class AccountFormComponent implements OnInit {

  accountForm: FormGroup;
  nameControl: FormControl;
  numberControl: FormControl;
  balanceControl: FormControl;
  detailsControl: FormControl;

  private account: Account;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    this.account = new Account();
    this.account.name = "";
    this.account.number = "";
    this.account.balance = 0;
    this.account.details = "";

    this.nameControl = this.formBuilder.control(this.account.name, Validators.required);
    this.numberControl = this.formBuilder.control(this.account.number, Validators.required);
    this.balanceControl = this.formBuilder.control(this.account.balance, [ Validators.required, Validators.pattern('^[0-9]+([.][0-9]{0,2})?$') ]);
    this.detailsControl = this.formBuilder.control(this.account.details);
    this.accountForm = this.formBuilder.group({
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
    this.activatedRoute.params
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

  saveAccount() {
    this.accountService.save(this.account)
      .subscribe(
        response => this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été créé/modifié')),
        error =>  this.alertService.emit(new Alert('danger', 'Une alerte est survenue durant la création/modification du compte bancaire'))
      );
  }
}
