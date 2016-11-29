import { Component, OnInit } from '@angular/core';
import { OperationService } from '../operation.service'
import { AlertService } from '../alert.service'
import { Operation } from '../operation'
import { PaginatedList } from '../paginated-list';
import { Alert } from '../alert'
import { MonthNamePipe } from '../month-name.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-operations',
  templateUrl: 'operations.component.html',
  styleUrls: ['operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: Operation[];
  page: number = 1;
  previousPage: number;
  nextPage: number;
  total: number;
  year: number = null;
  month: number = null;
  yearItems: Object;
  monthItems: Array<number>;
  searchValue: string = '';

  constructor(
    private operationService: OperationService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.operationService.operationChanged$.subscribe(
      operations => this.refreshList()
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
    this.operationService.getList(this.page, this.year, this.month, this.searchValue).subscribe(
      operations => {
        this.operations = operations.list;
        this.previousPage = operations.previous;
        this.nextPage = operations.next;
        this.total = operations.total;
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
