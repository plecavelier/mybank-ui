import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ChartData } from './chart-data';
import { OperationService } from '../operation/operation.service';
import { Filter } from '../dashboard/filter';
import { FilterService } from '../dashboard/filter.service';

@Injectable()
export class ChartDataListResolver implements Resolve<Array<ChartData>> {

  constructor(private operationService: OperationService,
    private filterService: FilterService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.operationService.getChartDatas('month', this.filterService.filter);
  }
}
