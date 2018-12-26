import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Alert } from '../shared/alert';
import { AlertService } from '../shared/alert.service';
import { FilterService } from '../dashboard/filter.service';
import { Filter } from '../dashboard/filter';
import { OperationService } from '../operation/operation.service';
import {Tag} from '../tag/tag';
import {TagService} from '../tag/tag.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {

  gap = 10;
  year: number = null;
  years: number[];
  budgets: Tag[];
  filter: Filter;
  filterChangedSubscription: Subscription;

  constructor(private tagService: TagService,
    private alertService: AlertService,
    private filterService: FilterService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    let today: Date = new Date();
    this.year = today.getFullYear();

    this.years = this.route.snapshot.data['years'];

    this.budgets = this.route.snapshot.data['budgets'];

    this.filter = this.filterService.filter;
    this.filterChangedSubscription = this.filterService.filterChanged$.subscribe(
        filter => {
          this.filter = filter;
          this.refreshList();
        }
    );
  }

  ngOnDestroy() {

  }

  private refreshList() {
    this.tagService.getAllBudgets(this.year, this.filter).subscribe(
        budgets => {
          this.budgets = budgets;
        },
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant la récupération des budgets'))
    );
  }

  changeYear(year: string) {
    this.year = Number.parseInt(year);
    this.refreshList();
  }

  changeBudget(budget: Tag) {
    budget.budgetAmountInput = budget.budgetAmount / 100;
  }

  saveBudget(budget: Tag) {
    budget.budgetAmount = Math.round(budget.budgetAmountInput * 100);
    budget.budgetYear = this.year;
    this.tagService.updateBudget(budget).subscribe(
        response => {
          this.refreshList();
        },
        error =>  this.alertService.emit(new Alert('danger', 'Une erreur est survenue durant l\'enregistrement du budget'))
    );
  }

  isInputShown(budget: Tag) {
    return budget.budgetAmountInput !== null || budget.budgetAmount === null;
  }

  getPercentTag(budget: Tag) {
    if (budget.budgetAmount) {
      return Math.round(budget.gap / budget.budgetAmount * 100);
    }
    return null;
  }

  getBudget() {
    let budget = 0;
    this.budgets.forEach(tag => {
      budget += tag.budgetAmount;
    });
    return budget;
  }

  getTotal() {
    let total = 0;
    this.budgets.forEach(tag => {
      total += tag.totalAmount;
    });
    return total;
  }

  getGap() {
    let gap = 0;
    this.budgets.forEach(tag => {
      gap += tag.gap;
    });
    return gap;
  }
}
