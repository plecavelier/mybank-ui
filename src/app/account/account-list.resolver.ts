import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Account } from './account';
import { AccountService } from './account.service';

@Injectable()
export class AccountListResolver implements Resolve<Array<Account>> {

  constructor(private accountService: AccountService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.accountService.getAll();
  }
}
