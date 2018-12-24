import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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

@Injectable()
export class TagService extends RestService<Tag, TagType> {

  disabledShown: boolean = false;

  getModelType(): TagType {
    return new TagType();
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
