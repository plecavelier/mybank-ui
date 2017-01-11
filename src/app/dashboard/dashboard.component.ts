import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { AuthService } from '../auth/auth.service';
import { AccountType } from '../account/account-type';
import { AccountService } from '../account/account.service';
import { TagType } from '../tag/tag-type';
import { TagService } from '../tag/tag.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  alerts: Array<Alert> = [];
  alertEmittedSubscription: Subscription;
  accountType: AccountType = new AccountType();
  tagType: TagType = new TagType();

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private accountService: AccountService,
    private tagService: TagService) {
    this.alertEmittedSubscription = this.alertService.alertEmitted$.subscribe(
      alert => this.alerts.push(alert)
    );
  }

  ngOnDestroy() {
    this.alertEmittedSubscription.unsubscribe();
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
