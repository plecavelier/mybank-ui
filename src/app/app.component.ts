import { Component } from '@angular/core';
import { AccountListComponent } from './account-list/account-list.component'
import { Alert } from './alert';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ AccountListComponent ]
})
export class AppComponent {
  
  public alerts: Array<Alert> = [];

  displayAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  public closeAlert(alert: Alert) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
