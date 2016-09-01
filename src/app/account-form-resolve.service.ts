import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Account } from './account';
import { Alert } from './alert';
import { AccountService } from './account.service';
import { AlertService } from './alert.service';

@Injectable()
export class AccountFormResolveService implements Resolve<Account> {

  constructor(private router: Router, private accountService: AccountService, private alertService: AlertService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    return this.accountService.get(id);
  }
}
