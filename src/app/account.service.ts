import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Account } from './account'

@Injectable()
export class AccountService {

  private accountsUrl = 'http://127.0.0.1:8000/accounts';

  constructor(private http: Http) { }

  get(id): Observable<Account> {
    return this.http.get(this.accountsUrl + '/' + id)
      .map(response => <Account> response.json())
      .do(account => account.id = account['@id'].replace('/accounts/', ''))
      .catch(this.handleError);
  }

  getAll(): Observable<Account[]> {
    return this.http.get(this.accountsUrl)
      .map(response => <Account[]> response.json()['hydra:member'])
      .do(accounts => accounts.forEach(account => {
        account.id = account['@id'].replace('/accounts/', '');
      }))
      .catch(this.handleError);
  }

  save(account: Account) {
    return this.http.post(this.accountsUrl, JSON.stringify(account))
      .catch(this.handleError);
  }

  delete(account: Account) {
    return this.http.delete(this.accountsUrl + '/' + account.id)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
