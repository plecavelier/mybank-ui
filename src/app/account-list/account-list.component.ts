import { Component, OnInit, EventEmitter } from '@angular/core';
import { AccountService } from '../account.service'
import { Account } from '../account'

@Component({
  moduleId: module.id,
  selector: 'ul[app-account-list]',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css'],
  providers: [AccountService],
  outputs: ['alertEvent']
})
export class AccountListComponent implements OnInit {

  public accounts: Array<any>;
  alertEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll().subscribe(
      accounts => this.accounts = accounts,
      error =>  console.error(error)
    );
  }

  deleteAccount(account: Account) {
    if (confirm('Souhaitez-vous vraiment supprimer ce compte bancaire ?')) {
      this.accountService.delete(account).subscribe(
        response => {
          console.log('emit event');
          this.alertEvent.emit('Succès');
        },
        error =>  console.error(error)
      );
    }
  }
}
