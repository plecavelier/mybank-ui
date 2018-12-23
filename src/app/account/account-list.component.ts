import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { Account } from './account';
import { AccountService } from './account.service';
import { AccountType } from './account-type';
import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { FilterService } from '../dashboard/filter.service';
import { OperationService } from '../operation/operation.service';

@Component({
  selector: 'ul[app-account-list]',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {

  @Input() accounts: Account[];
  selectedAccounts: Account[] = [];
  accountType: AccountType = new AccountType();
  accountToEdit: Account;
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private filterService: FilterService,
    private operationService: OperationService) {
  }

  toggleAccount(account: Account) {
    let index = this.selectedAccounts.findIndex(current => current.id == account.id);
    if (index > -1) {
      this.selectedAccounts.splice(index, 1);
    } else {
      this.selectedAccounts.push(account);
    }
    this.filterService.updateAccounts(this.selectedAccounts);
  }

  isSelected(account: Account) {
    return this.selectedAccounts.findIndex(current => current.id == account.id) > -1;
  }

  editAccount(account: Account) {
    this.accountToEdit = account;
    this.editModal.show();
  }

  disableAccount(account: Account) {
    account.disabled = true;
    this.accountService.update(account).subscribe(
        response => this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été désactivé')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la désactivation du compte bancaire'))
    );
  }

  enableAccount(account: Account) {
    account.disabled = false;
    this.accountService.update(account).subscribe(
        response => this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été réactivé')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la réactivation du compte bancaire'))
    );
  }

  deleteAccount(account: Account) {
    if (confirm('Souhaitez-vous vraiment supprimer ce compte bancaire ?')) {
      this.accountService.delete(account).subscribe(
        response => this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été supprimé')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression du compte bancaire'))
      );
    }
  }

  isShown(account: Account): boolean {
    return this.accountService.isShown(account);
  }
}
