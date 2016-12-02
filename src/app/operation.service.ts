import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
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

  private operationsUrl = 'http://127.0.0.1:8000/operations';

  constructor(private authHttp: AuthHttp) { }

  getItem(id: number): Observable<Operation> {
    return this.authHttp.get(this.operationsUrl + '/' + id)
      .map(response => <Operation> response.json())
      .do(operation => {
        operation.date = new Date(operation.date.toString());
      })
      .catch(this.handleError);
  }

  getList(page: number = 1, year: number = null, month: number = null, searchValue: string = null): Observable<PaginatedList<Operation>> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('page', String(page));
    params.set('order[date]', 'desc');

    let [from, to]: Array<string> = this.getFromTo(year, month);
    if (from && to) {
      params.set('date[after]', from);
      params.set('date[before]', to);
    }
    if (searchValue) {
      params.set('name', searchValue);
    }

    let options = new RequestOptions({search: params});

    return this.authHttp.get(this.operationsUrl, options)
      .map(response => {
        let jsonResponse = response.json();
        let operations: PaginatedList<Operation> = new PaginatedList<Operation>();
        operations.page = page;
        operations.list = <Operation[]> jsonResponse['hydra:member'];
        operations.total = jsonResponse['hydra:totalItems'];
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

  getYearMonths() {
    return this.authHttp.get('http://127.0.0.1:8000/operation_year_months')
      .map(response => {
        let jsonResponse = response.json();

        let today: Date = new Date();
        jsonResponse.push({year: today.getFullYear(), month: today.getMonth() + 1});

        jsonResponse.sort(function(item1, item2) {
          if (item1.year == item2.year) {
            return item1.month - item2.month;
          }
          return item1.year - item2.year;
        });

        let yearMonths: Object = {};
        for (let item of jsonResponse) {
          if (!(item.year in yearMonths)) {
            yearMonths[item.year] = [];
          }
          yearMonths[item.year].push(item.month);
        }

        return yearMonths;
      })
      .catch(this.handleError);
  }

  update(operation: Operation) {
    let operationObject = JSON.parse(JSON.stringify(operation));
    if (operation.account) {
      operationObject.account = operation.account['@id'];
    }
    if (operation.tag) {
      operationObject.tag = operation.tag['@id'];
    }
    return this.authHttp.put(this.operationsUrl + '/' + operation.id, JSON.stringify(operationObject))
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  save(operation: Operation) {
    let operationObject = JSON.parse(JSON.stringify(operation));
    if (operation.account) {
      operationObject.account = operation.account['@id'];
    }
    if (operation.tag) {
      operationObject.tag = operation.tag['@id'];
    }
    return this.authHttp.post(this.operationsUrl, JSON.stringify(operationObject))
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  delete(operation: Operation) {
    return this.authHttp.delete(this.operationsUrl + '/' + operation.id)
      .do(() => this.operationChangedSubject.next(operation))
      .catch(this.handleError);
  }

  private getFromTo(year: number, month: number): Array<string> {
    let from: string;
    let to: string;
    // Replace with moment library
    if (year) {
      if (month) {
        from = year + '-' + (month < 10 ? '0' + month : String(month)) + '-01';
        if (month == 12) {
          to = (year + 1) + '-01-01';
        } else {
          to = year + '-' + ((month + 1) < 10 ? '0' + (month + 1) : String(month + 1)) + '-01';
        }
      } else {
        from = year + '-01-01';
        to = (year + 1) + '-01-01';
      }
    }
    return [from, to];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
