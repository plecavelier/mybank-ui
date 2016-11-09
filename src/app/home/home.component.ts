import { Component, OnInit } from '@angular/core';
import { AccountListComponent } from '../account-list/account-list.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { AlertService } from '../alert.service';
import { Alert } from '../alert';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ AccountListComponent, TagListComponent ]
})
export class HomeComponent implements OnInit {
  
  alerts: Array<Alert> = [];

  constructor(private alertService: AlertService) {
    this.alertService.alertEmitted$.subscribe(
      alert => this.alerts.push(alert)
    );
  }

  ngOnInit() {
  }

  closeAlert(alert: Alert) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
