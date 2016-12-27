import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  alerts: Array<Alert> = [];

  constructor(private router: Router, private alertService: AlertService, private authService: AuthService) {
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

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
