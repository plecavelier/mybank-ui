import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Alert } from './alert';

@Injectable()
export class AlertService {

  private alertEmittedSubject: Subject<Alert> = new Subject<Alert>();
  alertEmitted$: Observable<Alert> = this.alertEmittedSubject.asObservable();

  constructor() { }

  emit(alert: Alert) {
  	this.alertEmittedSubject.next(alert);
  }
}
