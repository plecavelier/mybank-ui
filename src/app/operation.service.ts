import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import { Operation } from './operation';

@Injectable()
export class OperationService {

  private operationChangedSubject = new Subject<Operation>();
  operationChanged$ = this.operationChangedSubject.asObservable();

  private operationsUrl = 'http://127.0.0.1:8000/operations';

  constructor(private http: Http) { }

  get(id): Observable<Operation> {
    return this.http.get(this.operationsUrl + '/' + id)
      .map(response => <Operation> response.json())
      .do(operation => {
        operation.date = new Date(operation.date.toString());
      	operation.id = operation['@id'].replace('/operations/', '');
      })
      .catch(this.handleError);
  }

  getAll(): Observable<Operation[]> {
    return this.http.get(this.operationsUrl)
      .map(response => <Operation[]> response.json()['hydra:member'])
      .do(operations => {
        operations.forEach(operation => {
          operation.date = new Date(operation.date.toString());
          operation.id = operation['@id'].replace('/operations/', '');
        });
      })
      .catch(this.handleError);
  }

  update(operation: Operation) {
    return this.http.put(this.operationsUrl + '/' + operation.id, JSON.stringify(operation))
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  save(operation: Operation) {
    return this.http.post(this.operationsUrl, JSON.stringify(operation))
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  delete(operation: Operation) {
    return this.http.delete(this.operationsUrl + '/' + operation.id)
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
