import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { AuthHttp } from 'angular2-jwt';

import { RestService } from '../shared/rest.service';
import { Account } from './account';
import { AccountType } from './account-type';

@Injectable()
export class AccountService extends RestService<Account, AccountType> {

  getModelType(): AccountType {
    return new AccountType();
  }
}
