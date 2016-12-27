import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

import { Account } from '../account/account';
import { Filter } from './filter';
import { Tag } from '../tag/tag';

@Injectable()
// TODO : ce service devrait etre un singleton
export class FilterService {

  private filterChangedSubject = new Subject<Filter>();
  filterChanged$ = this.filterChangedSubject.asObservable();
  filter: Filter = new Filter();

  constructor() { }

  updateAccounts(accounts: Array<Account>) {
    this.filter.accounts = accounts;
    this.filterChangedSubject.next(this.filter);
  }

  updateTags(tags: Array<Tag>) {
    this.filter.tags = tags;
    this.filterChangedSubject.next(this.filter);
  }
}