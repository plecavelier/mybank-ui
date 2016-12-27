import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/combineLatest';
import { AuthHttp } from 'angular2-jwt';

import { RestService } from '../shared/rest.service';
import { ChartData } from '../chart/chart-data';
import { Filter } from '../dashboard/filter';
import { Operation } from './operation';
import { OperationType } from './operation-type';
import { OperationPaginatedList } from './operation-paginated-list';

@Injectable()
export class OperationService extends RestService<Operation, OperationType> {

  private operationsUrl = 'http://127.0.0.1:8000/operations';

  getModelType(): OperationType {
    return new OperationType();
  }

  // TODO : manage parameters with generic REST service
  getList(page: number = 1, year: number = null, month: number = null, searchValue: string = null, filter: Filter = null): Observable<OperationPaginatedList> {

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

    if (filter) {
      if (filter.accounts && filter.accounts.length > 0) {
        params.set('account.id', filter.accounts.map(account => {
          return account.id;
        }).join());
      }
      if (filter.tags && filter.tags.length > 0) {
        params.set('tag.id', filter.tags.map(tag => {
          return tag.id;
        }).join());
      }
    }

    let options = new RequestOptions({search: params});

    let httpList = this.authHttp.get(this.operationsUrl, options);
    let httpTotal = this.authHttp.get(this.operationsUrl + '_total', options);

    return httpList
      .combineLatest(httpTotal)
      .map(responses => {
        let jsonResponseList = responses[0].json();
        let jsonResponseTotal = responses[1].json();
        let operations: OperationPaginatedList = new OperationPaginatedList();
        operations.page = page;
        operations.list = <Operation[]> jsonResponseList['hydra:member'];
        operations.total = jsonResponseList['hydra:totalItems'];
        operations.list.forEach(operation => {
          operation.date = new Date(operation.date.toString());
        });
        if ('hydra:view' in jsonResponseList) {
          if (page > 1) {
            operations.previous = page - 1;
          }
          if ('hydra:next' in jsonResponseList['hydra:view']) {
            operations.next = page + 1;
          }
        }
        operations.totalAmount = jsonResponseTotal;
        return operations;
      })
      .catch(this.handleError);
  }

  // TODO : export in dedicated service
  getChartDatas(period: string, filter: Filter): Observable<Array<ChartData>> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('period', period);

    if (filter) {
      if (filter.accounts && filter.accounts.length > 0) {
        params.set('accounts', filter.accounts.map(account => {
          return account.id;
        }).join());
      }
      if (filter.tags && filter.tags.length > 0) {
        params.set('tags', filter.tags.map(tag => {
          return tag.id;
        }).join());
      }
    }

    let options = new RequestOptions({search: params});

    return this.authHttp.get('http://127.0.0.1:8000/operation_chart_datas', options)
      .map(response => {
        let jsonResponse = response.json();
        jsonResponse.forEach(item => {
          item.date = new Date(item.date);
          item.amount = parseInt(item.amount);
        });
        let chartDatas = <Array<ChartData>> jsonResponse;
        return chartDatas;
      })
      .catch(this.handleError);
  }

  // TODO : export in dedicated service
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

  // TODO : export in dedicated service
  import(ofxContent: string) {
    let params = {
      format: 'ofx',
      content: ofxContent
    }
    return this.authHttp.post('http://127.0.0.1:8000/operation_imports', params)
      .do(() => this.changedSubject.next(null))
      .catch(this.handleError);
  }

  // TODO : refactor with moment library
  private getFromTo(year: number, month: number): Array<string> {
    let from: string;
    let to: string;
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
}
