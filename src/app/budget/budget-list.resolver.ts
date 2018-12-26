import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FilterService } from '../dashboard/filter.service';
import {TagService} from '../tag/tag.service';
import {Tag} from '../tag/tag';

@Injectable()
export class BudgetListResolver implements Resolve<Array<Tag>> {

  constructor(private tagService: TagService,
    private filterService: FilterService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let today: Date = new Date();
    let year = today.getFullYear();
    return this.tagService.getAllBudgets(year, this.filterService.filter);
  }
}
