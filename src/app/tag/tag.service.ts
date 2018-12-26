import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import { AuthHttp } from 'angular2-jwt';

import { RestService } from '../shared/rest.service';
import { Tag } from './tag';
import { TagType } from './tag-type';
import {Account} from '../account/account';
import {environment} from '../../environments/environment';
import {Filter} from '../dashboard/filter';

@Injectable()
export class TagService extends RestService<Tag, TagType> {

  disabledShown: boolean = false;

  getModelType(): TagType {
    return new TagType();
  }

  getAllBudgets(year: number, filter: Filter = null): Observable<Tag[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('year', String(year));

    if (filter) {
      if (filter.tags && filter.tags.length > 0) {
        params.set('tag.id', filter.tags.map(tag => {
          return tag.id;
        }).join());
      }
    }

    let options = new RequestOptions({search: params});

    return this.authHttp.get(environment['apiUrl'] + '/tags/budget', options)
        .map((response: Response) => this.mapperService.mapToEntities(response, this.getModelType()))
        .catch(this.handleError);
  }

  updateBudget(entity: Tag) {
    return this.authHttp.put(environment['apiUrl'] + '/tags' + '/' + entity['id'] + '/budget', JSON.stringify(this.mapperService.mapToObject(entity, this.getModelType())))
        .do(() => this.changedSubject.next(entity))
        .catch(this.handleError);
  }

  showDisabled() {
    this.disabledShown = true;
  }

  hideDisabled() {
    this.disabledShown = false;
  }

  isShown(tag: Tag): boolean {
    return this.disabledShown || !tag.disabled;
  }
}
