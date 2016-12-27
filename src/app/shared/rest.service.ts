import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import { AuthHttp } from 'angular2-jwt';

import { MapperService } from './mapper.service';
import { ModelType } from './model-type';

@Injectable()
export abstract class RestService<E, T extends ModelType<E>> {

  private changedSubject = new Subject<E>();
  changed$ = this.changedSubject.asObservable();

  constructor(protected authHttp: AuthHttp, protected mapperService: MapperService) { }

  abstract getModelType(): T;

  get(id: number): Observable<E> {
    return this.authHttp.get(this.getUrl() + '/' + id)
      .map((response: Response) => this.mapperService.mapToEntity(response, this.getModelType()))
      .catch(this.handleError);
  }

  getAll(): Observable<E[]> {
    return this.authHttp.get(this.getUrl())
      .map((response: Response) => this.mapperService.mapToEntities(response, this.getModelType()))
      .catch(this.handleError);
  }

  update(entity: E) {
    return this.authHttp.put(this.getUrl() + '/' + entity['id'], JSON.stringify(this.mapperService.mapToObject(entity, this.getModelType())))
      .do(() => this.changedSubject.next(entity))
      .catch(this.handleError);
  }

  save(entity: E) {
    return this.authHttp.post(this.getUrl(), JSON.stringify(this.mapperService.mapToObject(entity, this.getModelType())))
      .do(() => this.changedSubject.next(entity))
      .catch(this.handleError);
  }

  delete(entity: E) {
    return this.authHttp.delete(this.getUrl() + '/' + entity['id'])
      .do(() => this.changedSubject.next(entity))
      .catch(this.handleError);
  }

  private getUrl(): string {
    let entity: E = this.getModelType().factory();
    let name: string = entity.constructor.name.toLowerCase();
    return 'http://127.0.0.1:8000/' + name + 's';
  }

  protected handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}