import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'ul[app-account-list]',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css']
})
export class AccountListComponent implements OnInit {

  public accounts: Array<any>;

  constructor(private _http: Http) { }

  ngOnInit() {
    this._http.get('http://127.0.0.1:8000/accounts', {})
      .map(response => response.json()['hydra:member'])
      .toPromise()
      .then(response => {
        response.forEach(account => {
          account.id = account['@id'].replace('/accounts/', '');
        });
        console.log(response);
        this.accounts = response;
      })
      .catch(error => console.error(error));
  }
}
