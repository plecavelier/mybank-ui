import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Operation } from './operation';
import { OperationService } from './operation.service';

@Injectable()
export class OperationFormResolveService implements Resolve<Operation> {

  constructor(private operationService: OperationService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    return this.operationService.get(id);
  }
}
