import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import { Operation } from './operation';
import { PaginatedList } from './paginated-list';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OperationService {

  private operationChangedSubject = new Subject<Operation>();
  operationChanged$ = this.operationChangedSubject.asObservable();

  private operationsUrl = 'http://127.0.0.1:8000/api/operations';

  constructor(private authHttp: AuthHttp) { }

  getItem(id: number): Observable<Operation> {
    return this.authHttp.get(this.operationsUrl + '/' + id)
      .map(response => <Operation> response.json())
      .do(operation => {
        operation.date = new Date(operation.date.toString());
      })
      .catch(this.handleError);
  }

  getList(page: number = 1): Observable<PaginatedList<Operation>> {
    let url = this.operationsUrl + '?page=' + page;
    return this.authHttp.get(url)
      .map(response => {
        let jsonResponse = response.json();
        let operations: PaginatedList<Operation> = new PaginatedList<Operation>();
        operations.page = page;
        operations.list = <Operation[]> jsonResponse['hydra:member'];
        operations.list.forEach(operation => {
          operation.date = new Date(operation.date.toString());
        });
        if ('hydra:view' in jsonResponse) {
          if (page > 1) {
            operations.previous = page - 1;
          }
          if ('hydra:next' in jsonResponse['hydra:view']) {
            operations.next = page + 1;
          }
        } 
        return operations;
      })
      .catch(this.handleError);
  }

  update(operation: Operation) {
    return this.authHttp.put(this.operationsUrl + '/' + operation.id, JSON.stringify(operation))
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  save(operation: Operation) {
    return this.authHttp.post(this.operationsUrl, JSON.stringify(operation))
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  delete(operation: Operation) {
    return this.authHttp.delete(this.operationsUrl + '/' + operation.id)
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
