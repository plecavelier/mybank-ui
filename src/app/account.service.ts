import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import { Account } from './account';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AccountService {

  private accountChangedSubject = new Subject<Account>();
  accountChanged$ = this.accountChangedSubject.asObservable();

  private accountsUrl = 'http://127.0.0.1:8000/api/accounts';
  private options;

  constructor(private authHttp: AuthHttp) { }

  get(id): Observable<Account> {
    return this.authHttp.get(this.accountsUrl + '/' + id, this.options)
      .map(response => <Account> response.json())
      .catch(this.handleError);
  }

  getAll(): Observable<Account[]> {
    return this.authHttp.get(this.accountsUrl, this.options)
      .map(response => <Account[]> response.json()['hydra:member'])
      .catch(this.handleError);
  }

  update(account: Account) {
    return this.authHttp.put(this.accountsUrl + '/' + account.id, account, this.options)
      .do(() => this.accountChangedSubject.next(account))
      .catch(this.handleError);
  }

  save(account: Account) {
    return this.authHttp.post(this.accountsUrl, account, this.options)
      .do(() => this.accountChangedSubject.next(account))
      .catch(this.handleError);
  }

  delete(account: Account) {
    return this.authHttp.delete(this.accountsUrl + '/' + account.id, this.options)
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
