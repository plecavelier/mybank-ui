import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import { Account } from './account';

@Injectable()
export class AccountService {

  private accountChangedSubject = new Subject<Account>();
  accountChanged$ = this.accountChangedSubject.asObservable();

  private accountsUrl = 'http://127.0.0.1:8000/accounts';

  constructor(private http: Http) { }

  get(id): Observable<Account> {
    return this.http.get(this.accountsUrl + '/' + id)
      .map(response => <Account> response.json())
      .do(account => { account.id = account['@id'].replace('/accounts/', '') })
      .catch(this.handleError);
  }

  getAll(): Observable<Account[]> {
    return this.http.get(this.accountsUrl)
      .map(response => <Account[]> response.json()['hydra:member'])
      .do(accounts => {
        accounts.forEach(account => {
          account.id = account['@id'].replace('/accounts/', '');
        });
      })
      .catch(this.handleError);
  }

  update(account: Account) {
    return this.http.put(this.accountsUrl + '/' + account.id, JSON.stringify(account))
      .do(() => this.accountChangedSubject.next(account))
      .catch(this.handleError);
  }

  save(account: Account) {
    return this.http.post(this.accountsUrl, JSON.stringify(account))
      .do(() => this.accountChangedSubject.next(account))
      .catch(this.handleError);
  }

  delete(account: Account) {
    return this.http.delete(this.accountsUrl + '/' + account.id)
      .do(() => this.accountChangedSubject.next(account))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
