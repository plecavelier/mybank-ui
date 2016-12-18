import { Component, OnInit } from '@angular/core';
import { OperationService } from '../operation.service'
import { AlertService } from '../alert.service'
import { FilterService } from '../filter.service'
import { Filter } from '../filter'
import { Alert } from '../alert'

@Component({
  moduleId: module.id,
  selector: 'app-statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  modes: { [key:string]: string } = {
    comparison: 'Comparaison',
    evolution: 'Evolution'
  };
  mode: string = 'comparison';

  periods: { [key:string]: string } = {
    month: 'Mensuel',
    quarter: 'Trimestriel',
    year: 'Annuel'
  };
  period: string = 'month';

  filter: Filter;

  constructor(private operationService: OperationService,
    private alertService: AlertService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.filterChanged$.subscribe(
      filter => {
        this.filter = filter;
        this.refreshList();
      }
    );
    this.filter = this.filterService.filter;
    this.refreshList();
  }

  changeMode(mode: string) {
    this.mode = mode;
    this.refreshList();
  }

  changePeriod(period: string) {
    this.period = period;
    this.refreshList();
  }

  private refreshList() {
    this.operationService.getChartDatas(this.period, this.filter).subscribe(
      chartDatas => {
      },
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des statistiques'))
    );
  }
}
