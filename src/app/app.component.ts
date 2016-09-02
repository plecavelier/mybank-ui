import { Component } from '@angular/core';
import { AccountListComponent } from './account-list/account-list.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { AlertService } from './alert.service';
import { Alert } from './alert';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ AccountListComponent, TagListComponent ]
})
export class AppComponent {
  
  alerts: Array<Alert> = [];

  constructor(private alertService: AlertService) {
    this.alertService.alertEmitted$.subscribe(
      alert => this.alerts.push(alert)
    );
  }

  closeAlert(alert: Alert) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
