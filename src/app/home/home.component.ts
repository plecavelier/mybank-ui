import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { SecurityService } from '../security.service';
import { Alert } from '../alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  alerts: Array<Alert> = [];

  constructor(private router: Router, private alertService: AlertService, private securityService: SecurityService) {
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
    this.securityService.logout();
    this.router.navigate(['login']);
  }
}
