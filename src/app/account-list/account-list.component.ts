import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service'
import { AlertService } from '../alert.service'
import { FilterService } from '../filter.service'
import { Account } from '../account'
import { Alert } from '../alert'

@Component({
  moduleId: module.id,
  selector: 'ul[app-account-list]',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Array<Account>;
  selectedAccounts: Array<Account> = [];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private filterService: FilterService) {
  }

  ngOnInit() {
    this.accountService.accountChanged$.subscribe(
      account => this.refreshList()
    );
    this.refreshList();
  }

  private refreshList() {
    this.accountService.getAll().subscribe(
      accounts => this.accounts = accounts,
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des comptes bancaires'))
    );
  }

  toggleAccount(account: Account) {
    let index = this.selectedAccounts.indexOf(account);
    if (index > -1) {
      this.selectedAccounts.splice(index, 1);
    } else {
      this.selectedAccounts.push(account);
    }
    this.filterService.updateAccounts(this.selectedAccounts);
  }

  isSelected(account: Account) {
    return this.selectedAccounts.indexOf(account) > -1;
  }

  deleteAccount(account: Account) {
    if (confirm('Souhaitez-vous vraiment supprimer ce compte bancaire ?')) {
      this.accountService.delete(account).subscribe(
        response => this.alertService.emit(new Alert('success', 'Le compte bancaire a bien été supprimé')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression du compte bancaire'))
      );
    }
  }
}
