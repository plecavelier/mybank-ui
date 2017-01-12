import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { Filter } from '../dashboard/filter';
import { FilterService } from '../dashboard/filter.service';
import { MonthNamePipe } from '../shared/month-name.pipe';
import { Operation } from './operation';
import { OperationService } from './operation.service';
import { OperationPaginatedList } from './operation-paginated-list';
import { Tag } from '../tag/tag';
import { TagService } from '../tag/tag.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnInit, OnDestroy {

  operations: Operation[];
  page: number = 1;
  previousPage: number;
  nextPage: number;
  total: number;
  totalAmount: number;
  year: number = null;
  month: number = null;
  yearItems: Object;
  monthItems: Array<number>;
  searchValue: string = '';
  filter: Filter;
  filterChangedSubscription: Subscription;
  accountChangedSubscription: Subscription;
  tagChangedSubscription: Subscription;
  operationChangedSubscription: Subscription;

  constructor(
    private accountService: AccountService,
    private tagService: TagService,
    private operationService: OperationService,
    private alertService: AlertService,
    private filterService: FilterService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    let today: Date = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;

    let operations: OperationPaginatedList = this.route.snapshot.data['operations'];
    this.operations = operations.list;
    this.previousPage = operations.previous;
    this.nextPage = operations.next;
    this.total = operations.total;
    this.totalAmount = operations.totalAmount;

    this.yearItems = this.route.snapshot.data['yearMonths'];
    this.monthItems = this.yearItems[this.year];
        
    this.filter = this.filterService.filter;
    this.filterChangedSubscription = this.filterService.filterChanged$.subscribe(
      filter => {
        this.page = 1;
        this.filter = filter;
        this.refreshList();
      }
    );
    this.accountChangedSubscription = this.accountService.changed$.subscribe(
      account => this.refreshList()
    );
    this.tagChangedSubscription = this.tagService.changed$.subscribe(
      tag => this.refreshList()
    );
    this.operationChangedSubscription = this.operationService.changed$.subscribe(
      operation => this.refreshList()
    );
  }

  ngOnDestroy() {
    this.filterChangedSubscription.unsubscribe();
    this.accountChangedSubscription.unsubscribe();
    this.tagChangedSubscription.unsubscribe();
    this.operationChangedSubscription.unsubscribe();
  }

  private refreshList() {
    this.operationService.getList(this.page, this.year, this.month, this.searchValue, this.filter).subscribe(
      operations => {
        this.operations = operations.list;
        this.previousPage = operations.previous;
        this.nextPage = operations.next;
        this.total = operations.total;
        this.totalAmount = operations.totalAmount;
      },
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des opérations'))
    );
  }

  changeYear(year: string) {
    this.page = 1;
    this.year = Number.parseInt(year);
    this.month = null;
    this.monthItems = this.yearItems[year];
    this.refreshList();
  }

  changeMonth(month: string) {
    this.page = 1;
    this.month = Number.parseInt(month);
    this.refreshList();
  }

  getYearRangeLabel(): string {
    if (this.yearItems) {
      let years = Object.keys(this.yearItems);
      if (years.length == 1) {
        return years[0].toString();
      } else {
        return years[0] + ' - ' + years[years.length - 1];
      }
    }
  }

  changePage(page: number) {
    this.page = page;
    this.refreshList();
  }

  search() {
    this.page = 1;
    this.refreshList();
  }

  editOperation(operation: Operation) {
    this.operationService.openForm(operation);
  }

  deleteOperation(operation: Operation) {
    if (confirm('Souhaitez-vous vraiment supprimer cette opération ?')) {
      this.operationService.delete(operation).subscribe(
        response => {
          this.alertService.emit(new Alert('success', 'L\'opération a bien été supprimée'));
          this.refreshList();
        },
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression de l\'opération'))
      );
    }
  }
}
