import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Account } from './account';
import { AccountService } from './account.service';
import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  accountForm: FormGroup;
  nameControl: FormControl;
  numberControl: FormControl;
  balanceControl: FormControl;
  descriptionControl: FormControl;

  title: string;
  buttonLabel: string;

  private account: Account;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    // Init account
    if (this.route.snapshot.data['account']) {
      this.account = this.route.snapshot.data['account'];
    } else {
      this.account = new Account();
    }

    // Create form
    this.nameControl = this.formBuilder.control(this.account.name, [ Validators.required, Validators.maxLength(50) ]);
    this.numberControl = this.formBuilder.control(this.account.number, [ Validators.required, Validators.maxLength(50) ]);
    this.balanceControl = this.formBuilder.control(this.account.balance, [ Validators.required, Validators.pattern('^[0-9]+([.][0-9]{0,2})?$') ]);
    this.descriptionControl = this.formBuilder.control(this.account.description, [ Validators.maxLength(250) ]);
    let controls = {
      name : this.nameControl,
      number : this.numberControl,
      description : this.descriptionControl
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
      this.account.description = value.description;
    });

    // Set title & button label
    if (this.isNew()) {
      this.title = 'Création d\'un compte bancaire';
      this.buttonLabel = 'Créer';
    } else {
      this.title = 'Modification du compte bancaire';
      this.buttonLabel = 'Modifier';
    }
  }

  saveAccount() {
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
