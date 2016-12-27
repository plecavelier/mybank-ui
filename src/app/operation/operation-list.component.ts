import { Component, OnInit } from '@angular/core';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { Filter } from '../dashboard/filter';
import { FilterService } from '../dashboard/filter.service';
import { MonthNamePipe } from '../shared/month-name.pipe';
import { Operation } from './operation';
import { OperationService } from './operation.service';
import { PaginatedList } from '../shared/paginated-list';
import { Tag } from '../tag/tag';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit {

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

  constructor(
    private operationService: OperationService,
    private alertService: AlertService,
    private filterService: FilterService) {
  }

  ngOnInit() {
    this.filter = this.filterService.filter;
    this.operationService.operationChanged$.subscribe(
      operations => this.refreshList()
    );
    this.filterService.filterChanged$.subscribe(
      filter => {
        this.page = 1;
        this.filter = filter;
        this.refreshList();
      }
    );
    this.operationService.getYearMonths().subscribe(
      yearMonths => {
        this.yearItems = yearMonths;
      },
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des opérations'))
    );
    this.refreshList();
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

  deleteOperation(operation: Operation) {
    if (confirm('Souhaitez-vous vraiment supprimer cette opération ?')) {
      this.operationService.delete(operation).subscribe(
        response => this.alertService.emit(new Alert('success', 'L\'opération a bien été supprimée')),
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la suppression de l\'opération'))
      );
    }
  }
}
