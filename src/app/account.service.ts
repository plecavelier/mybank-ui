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

  private accountsUrl = 'http://127.0.0.1:8000/api/accounts';
  private options;

  constructor(private http: Http) {
    let headers = new Headers();
    headers.append('Accept', 'application/ld+json');
    headers.append('Authorization', 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiZXhwIjoxNDc5MDgyMzA5LCJpYXQiOjE0Nzg3MjIzMDl9.P4cz8SxPSbA0CW0CB-fxHizLPcQ9WZGWQjRQxbflkKzGgzoWlj2Ggdht8bu8fsQYMNgn0YGkKJXo-GJl8otQLNkaWb4YMq1PSYGwczfDz2CrATPH4jfagj632zLVBozmb9mzWeqbP3mxK2mghAnTxs9MKQsBiYDaLMzVTO5QB6bXSRMZyHC_XCorIGTRceOUKKCag54XobfU1LV2uZlr-0QauS6ubXCX6X32PAWYZvXWRLknJsivXFSMXGDtSKhWoJdpBz9C6KP000H17urqanxMJppwYWt1bP92sPgKnWHoWa_HITz3eIzJF9qwCHftqylp4tPxEZyfh0xRgJ73MSmgx_Rs6OVAQOlqHmOqjd9KZOIk60YzuTzoXQlnLiwCDG7QH9jgMVAMk2Akv18sw1Mb0bWSienV4Blf53yevLL2LIAjYZQXgU1heZb-uaTb_DHfYN7fxVKorc6YniAkO2LeMPN9zgdkFa-1QV41DRaGUysedrlMejzJP7d1hU3Vttf0E6RjS1qk2Mm_bvQlQs1QBWnFhh_r1StwvWLgXSKNZPkRZ191JpQShKHmMztQj3EqmRM4mXIYfXyNTAQWUwD5pgVvKAVi9C2n56VGj_GuxJUOfjSmlPlyXr73j7Xn_YkQd9vKzsoUCNehEmjBJ8SgHZMZATpATKtCeaUOZ3Q');
    this.options = new RequestOptions({ headers: headers });
  }

  get(id): Observable<Account> {
    return this.http.get(this.accountsUrl + '/' + id, this.options)
      .map(response => <Account> response.json())
      .do(account => { account.id = account['@id'].replace('/api/accounts/', '') })
      .catch(this.handleError);
  }

  getAll(): Observable<Account[]> {
    return this.http.get(this.accountsUrl, this.options)
      .map(response => <Account[]> response.json()['hydra:member'])
      .do(accounts => {
        accounts.forEach(account => {
          account.id = account['@id'].replace('/api/accounts/', '');
        });
      })
      .catch(this.handleError);
  }

  update(account: Account) {
    return this.http.put(this.accountsUrl + '/' + account.id, account, this.options)
      .do(() => this.accountChangedSubject.next(account))
      .catch(this.handleError);
  }

  save(account: Account) {
    return this.http.post(this.accountsUrl, account, this.options)
      .do(() => this.accountChangedSubject.next(account))
      .catch(this.handleError);
  }

  delete(account: Account) {
    return this.http.delete(this.accountsUrl + '/' + account.id, this.options)
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
