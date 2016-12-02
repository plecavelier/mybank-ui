import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Account } from './account';
import { AccountService } from './account.service';

@Injectable()
export class AccountResolve implements Resolve<Account> {

  constructor(private accountService: AccountService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    return this.accountService.get(id);
  }
}
