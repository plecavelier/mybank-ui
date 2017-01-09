import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { OperationService } from '../operation/operation.service';

@Injectable()
export class YearMonthResolver implements Resolve<Object> {

  constructor(private operationService: OperationService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.operationService.getYearMonths();
  }
}
