import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { AuthService } from '../auth/auth.service';
import { Account } from '../account/account';
import { AccountType } from '../account/account-type';
import { AccountService } from '../account/account.service';
import { Tag } from '../tag/tag';
import { TagType } from '../tag/tag-type';
import { TagService } from '../tag/tag.service';
import { Operation } from '../operation/operation';
import { OperationService } from '../operation/operation.service';
import { OperationType } from '../operation/operation-type';
import { fadeAnimation } from '../shared/animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ fadeAnimation ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  alerts: Alert[] = [];
  alertEmittedSubscription: Subscription;
  accounts: Account[];
  tags: Tag[];
  accountType: AccountType = new AccountType();
  tagType: TagType = new TagType();
  operationType: OperationType = new OperationType();
  accountChangedSubscription: Subscription;
  tagChangedSubscription: Subscription;
  operationChangedSubscription: Subscription;
  models = {};
  operation: Operation;
  openOperationFormSubscription: Subscription;
  @ViewChild('operationModal') operationModal: ModalDirective;
  isNavCollapsed: boolean = true;
  isPanelCollapsed: boolean = true;
  openOperationTagsListSubscription: Subscription;
  @ViewChild('tagsListModal') tagsListModal: ModalDirective;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private accountService: AccountService,
    private tagService: TagService,
    private operationService: OperationService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.setAccounts(this.route.snapshot.data['accounts']);
    this.setTags(this.route.snapshot.data['tags']);

    this.accountChangedSubscription = this.accountService.changed$.subscribe(
      account => this.refreshAccounts()
    );
    this.tagChangedSubscription = this.tagService.changed$.subscribe(
      tag => this.refreshTags()
    );
    this.operationChangedSubscription = this.operationService.changed$.subscribe(
      operation => this.refreshAccounts()
    );
    this.alertEmittedSubscription = this.alertService.alertEmitted$.subscribe(
      alert => this.alerts.push(alert)
    );
    this.openOperationFormSubscription = this.operationService.openForm$.subscribe(
      operation => this.openOperationForm(operation)
    );
    this.openOperationTagsListSubscription = this.operationService.openTagsList$.subscribe(
      operation => this.openOperationTagsList(operation)
    );
  }

  ngOnDestroy() {
    this.accountChangedSubscription.unsubscribe();
    this.tagChangedSubscription.unsubscribe();
    this.operationChangedSubscription.unsubscribe();
    this.alertEmittedSubscription.unsubscribe();
    this.openOperationFormSubscription.unsubscribe();
    this.openOperationTagsListSubscription.unsubscribe();
  }

  openOperationForm(operation?: Operation) {
    this.operation = operation;
    this.operationModal.show();
  }

  openOperationTagsList(operation: Operation) {
    this.operation = operation;
    this.tagsListModal.show();
  }

  closeAlert(alert: Alert) {
    let index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  changeOperationTag(tag: Tag) {
    let oldTag = this.operation.tag;
    this.operation.tag = tag;
    this.operationService.update(this.operation)
      .subscribe(
        response => {
          this.alertService.emit(new Alert('success', 'La modification a bien été enregistrée'));
        }, error => {
          this.alerts.push(new Alert('danger', 'Une erreur est survenue durant l\'enregistrement'));
          this.operation.tag = oldTag;
        }
      );
  }

  showDisabledAccounts() {
    this.accountService.showDisabled();
  }

  hideDisabledAccounts() {
    this.accountService.hideDisabled();
  }

  isDisabledAccountsShown() {
    return this.accountService.disabledShown;
  }

  showDisabledTags() {
    this.tagService.showDisabled();
  }

  hideDisabledTags() {
    this.tagService.hideDisabled();
  }

  isDisabledTagsShown() {
    return this.tagService.disabledShown;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  private setAccounts(accounts: Account[]) {
    this.accounts = accounts;
    let accountModels = this.accounts.filter((account: Account) => {
      return !account.disabled;
    });
    this.models['account'] = accountModels;
  }

  private setTags(tags: Tag[]) {
    this.tags = tags;
    let tagModels = this.tags.filter((tag: Tag) => {
      return !tag.disabled;
    });
    this.models['tag'] = tagModels;
  }

  private refreshAccounts() {
    this.accountService.getAll().subscribe(
      accounts => {
        this.setAccounts(accounts);
      },
      error =>  this.alerts.push(new Alert('danger', 'Une erreur est survenue durant la récupération des comptes bancaires'))
    );
  }

  private refreshTags() {
    this.tagService.getAll().subscribe(
      tags => this.setTags(tags),
      error =>  this.alerts.push(new Alert('danger', 'Une erreur est survenue durant la récupération des catégories'))
    );
  }
}
