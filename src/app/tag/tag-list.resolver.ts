import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Tag } from './tag';
import { TagService } from './tag.service';

@Injectable()
export class TagListResolver implements Resolve<Array<Tag>> {

  constructor(private tagService: TagService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.tagService.getAll();
  }
}
