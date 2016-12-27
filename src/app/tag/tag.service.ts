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

@Injectable()
export class TagService extends RestService<Tag, TagType> {

  getModelType(): TagType {
    return new TagType();
  }
}
