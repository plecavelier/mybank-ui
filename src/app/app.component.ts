import { Component } from '@angular/core';
import { AccountListComponent } from './account-list/account-list.component'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ AccountListComponent ]
})
export class AppComponent {
  
  public alerts: Array<any> = [];

  displayAlert(message: string) {
    let alert = {
      type: 'success',
      message: message
    };
    this.alerts.push(alert);
  }

  public closeAlert(alert: any) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
