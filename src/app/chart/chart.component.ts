import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { FilterService } from '../dashboard/filter.service';
import { Filter } from '../dashboard/filter';
import { OperationService } from '../operation/operation.service';

declare var require: any;
const Highcharts = require('highcharts');
Highcharts.setOptions({
  lang : {
    months : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    shortMonths : ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Jui.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'],
    weekdays : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    resetZoom : "Réinitialiser zoom",
    resetZoomTitle : ""
  }
});

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

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
  options = null;
  filterChangedSubscription: Subscription;

  constructor(private operationService: OperationService,
    private alertService: AlertService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.filterChangedSubscription = this.filterService.filterChanged$.subscribe(
      filter => {
        this.filter = filter;
        this.refreshChart();
      }
    );
    this.filter = this.filterService.filter;
    this.refreshChart();
  }

  ngOnDestroy() {
    this.filterChangedSubscription.unsubscribe();
  }

  changeMode(mode: string) {
    this.mode = mode;
    this.refreshChart();
  }

  changePeriod(period: string) {
    this.period = period;
    this.refreshChart();
  }

  private refreshChart() {
    this.operationService.getChartDatas(this.period, this.filter).subscribe(
      chartDatas => {
        let options = this.getChartOptions();
        let sumAmount: number = 0;
        chartDatas.forEach(data => {
          sumAmount += data.amount;
          let amount = this.mode == 'comparison' ? data.amount / 100 : sumAmount / 100;
          options.series[0].data.push([data.date.getTime(), amount]);
        });
        this.options = options;
      },
      error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des statistiques'))
    );
  }

  private getChartOptions() {
    let thiz = this;
    return {
      chart : {
        zoomType : 'x'
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        title : {
          text : null
        }
      },
      yAxis : {
        title : {
          text : null
        },
        labels : {
          formatter : function() {
            let formatter = new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 2,
            });
            return formatter.format(this.value);
          }
        }
      },
      tooltip : {
        shared : true,
        crosshairs : true,
        formatter : function() {

          var displayedPeriod = "";
          switch (thiz.period) {
            case "year":
              displayedPeriod = Highcharts.dateFormat('%Y', this.x);
              break;

            case "quarter":
              var month = Highcharts.dateFormat('%m', this.x);
              var quarter = Math.floor((month - 1) / 3) + 1;
              var year = Highcharts.dateFormat('%Y', this.x);
              displayedPeriod = "T" + quarter + " " + year;
              break;

            case "month":
              displayedPeriod = Highcharts.dateFormat('%B %Y', this.x);
              break;
          }

          let formatter = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
          });

          let display = '' + displayedPeriod + '';
          display += '<br/>';
          display += '<b>' + formatter.format(this.points[0].y) + '</b>';

          return display;
        },
        borderWidth : 1,
        borderColor : "#AAAAAA"
      },
      series: [{
        type: 'area',
        lineWidth : 2,
        marker : {
          radius : 1
        },
        states : {
          hover : {
            lineWidth : 2
          }
        },
        data: [],
      }],
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillOpacity: 0.2
        }
      },
      lang: {

      }
    };
  }
}
