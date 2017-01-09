import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { OperationPaginatedList } from './operation-paginated-list';
import { OperationService } from '../operation/operation.service';
import { Filter } from '../dashboard/filter';
import { FilterService } from '../dashboard/filter.service';

@Injectable()
export class OperationPaginatedListResolver implements Resolve<OperationPaginatedList> {

  constructor(private operationService: OperationService,
    private filterService: FilterService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let today: Date = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    return this.operationService.getList(1, year, month, null, this.filterService.filter);
  }
}
