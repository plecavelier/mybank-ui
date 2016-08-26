import { Component, OnInit, EventEmitter } from '@angular/core';
import { AccountService } from '../account.service'
import { Account } from '../account'
import { Alert } from '../alert'

@Component({
  moduleId: module.id,
  selector: 'ul[app-account-list]',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css'],
  providers: [AccountService],
  outputs: ['alertEventEmitter']
})
export class AccountListComponent implements OnInit {

  public accounts: Array<Account>;
  private alertEventEmitter: EventEmitter<Alert> = new EventEmitter<Alert>();

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll().subscribe(
      accounts => this.accounts = accounts,
      error =>  console.error(error)
    );
  }

  deleteAccount(account: Account) {
    if (confirm('Souhaitez-vous vraiment supprimer ce compte bancaire ?')) {
      console.log(new Alert('success', 'Le compte bancaire a bien été supprimé'));
      this.accountService.delete(account).subscribe(
        response => this.alertEventEmitter.emit(new Alert('success', 'Le compte bancaire a bien été supprimé')),
        error =>  this.alertEventEmitter.emit(new Alert('error', 'Une alerte est survenue durant la suppression du compte bancaire'))
      );
    }
  }
}
