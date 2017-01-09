import { Routes, RouterModule } from '@angular/router';

import { AccountByIdResolver } from './account/account-by-id.resolver';
import { AccountFormComponent } from './account/account-form.component';
import { AccountListResolver } from './account/account-list.resolver';
import { AuthGuard } from './auth/auth.guard';
import { ChartComponent } from './chart/chart.component';
import { ChartDataListResolver } from './chart/chart-data-list.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportFormComponent } from './operation/import-form.component';
import { LoginComponent } from './auth/login.component';
import { OperationByIdResolver } from './operation/operation-by-id.resolver';
import { OperationFormComponent } from './operation/operation-form.component';
import { OperationListComponent } from './operation/operation-list.component';
import { OperationPaginatedListResolver } from './operation/operation-paginated-list.resolver';
import { TagByIdResolver } from './tag/tag-by-id.resolver';
import { TagFormComponent } from './tag/tag-form.component';
import { TagListResolver } from './tag/tag-list.resolver';
import { YearMonthResolver } from './operation/year-month.resolver';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [ AuthGuard ], resolve: { accounts: AccountListResolver, tags: TagListResolver }, children: [
    { path: '', redirectTo: '/operations', pathMatch: 'full' },
    { path: 'operations', component: OperationListComponent, resolve: { operations: OperationPaginatedListResolver, yearMonths: YearMonthResolver } },
    { path: 'import-form', component: ImportFormComponent },
    { path: 'statistics', component: ChartComponent, resolve: { chartDatas: ChartDataListResolver } },
    { path: 'account-form', component: AccountFormComponent },
    { path: 'account-form/:id', component: AccountFormComponent, resolve: { account: AccountByIdResolver } },
    { path: 'tag-form', component: TagFormComponent },
    { path: 'tag-form/:id', component: TagFormComponent, resolve: { tag: TagByIdResolver } },
    { path: 'operation-form', component: OperationFormComponent, resolve: { tags: TagListResolver, accounts: AccountListResolver } },
    { path: 'operation-form/:id', component: OperationFormComponent, resolve: { operation: OperationByIdResolver, accounts: AccountListResolver, tags: TagListResolver } }
  ] },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);