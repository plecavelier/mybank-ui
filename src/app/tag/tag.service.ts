import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import { AuthHttp } from 'angular2-jwt';

import { Tag } from './tag';

@Injectable()
export class TagService {

  private tagChangedSubject = new Subject<Tag>();
  tagChanged$ = this.tagChangedSubject.asObservable();

  private tagsUrl = 'http://127.0.0.1:8000/tags';

  constructor(private authHttp: AuthHttp) { }

  get(id): Observable<Tag> {
    return this.authHttp.get(this.tagsUrl + '/' + id)
      .map(response => <Tag> response.json())
      .catch(this.handleError);
  }

  getAll(): Observable<Tag[]> {
    return this.authHttp.get(this.tagsUrl)
      .map(response => <Tag[]> response.json()['hydra:member'])
      .catch(this.handleError);
  }

  update(tag: Tag) {
    return this.authHttp.put(this.tagsUrl + '/' + tag.id, JSON.stringify(tag))
      .do(() => this.tagChangedSubject.next(tag))
      .catch(this.handleError);
  }

  save(tag: Tag) {
    return this.authHttp.post(this.tagsUrl, JSON.stringify(tag))
      .do(() => this.tagChangedSubject.next(tag))
      .catch(this.handleError);
  }

  delete(tag: Tag) {
    return this.authHttp.delete(this.tagsUrl + '/' + tag.id)
      .do(() => this.tagChangedSubject.next(tag))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}