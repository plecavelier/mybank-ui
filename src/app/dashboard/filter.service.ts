import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Account } from '../account/account';
import { Filter } from './filter';
import { Tag } from '../tag/tag';

@Injectable()
export class FilterService {

  filter: Filter = new Filter();
  private filterChangedSubject = new Subject<Filter>();
  filterChanged$ = this.filterChangedSubject.asObservable();

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