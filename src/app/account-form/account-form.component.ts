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
  private newAccount: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    if (this.route.snapshot.data['account']) {
      this.account = this.route.snapshot.data['account'];
    } else {
      this.account = new Account();
    }

    this.nameControl = this.formBuilder.control(this.account.name, Validators.required);
    this.numberControl = this.formBuilder.control(this.account.number, Validators.required);
    this.balanceControl = this.formBuilder.control(this.account.balance, [ Validators.required, Validators.pattern('^[0-9]+([.][0-9]{0,2})?$') ]);
    this.detailsControl = this.formBuilder.control(this.account.details);
    let controls = {
      name : this.nameControl,
      number : this.numberControl,
      details : this.detailsControl
    }
    if (this.isNew()) {
      controls['balance'] = this.balanceControl;
    }
    this.accountForm = this.formBuilder.group(controls);

    this.accountForm.valueChanges.subscribe(value => {
      this.account.name = value.name;
      this.account.number = value.number;
      if (this.isNew()) {
        this.account.balance = value.balance;
      }
      this.account.details = value.details;
    });
  }

  saveAccount() {
    console.log(this.isNew());
    if (this.isNew()) {
      this.accountService.save(this.account)
        .subscribe(
          response => {
            this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été créé'));
            this.clearForm();
          },
          error => this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la création du compte bancaire'))
        );
    } else {
      this.accountService.update(this.account)
        .subscribe(
          response => this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été modifié')),
          error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la modification du compte bancaire'))
        );
    }
  }

  isNew(): boolean {
    return this.account.id === undefined;
  }

  private clearForm() {
    this.accountForm.reset();
    this.account = new Account();
    this.accountForm.patchValue(this.account);
  }
}
