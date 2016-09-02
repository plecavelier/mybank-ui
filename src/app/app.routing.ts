import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations/operations.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountFormResolveService } from './account-form-resolve.service';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagFormResolveService } from './tag-form-resolve.service';

const appRoutes: Routes = [
  { path: '', component: OperationsComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'account-form', component: AccountFormComponent },
  { path: 'account-form/:id', component: AccountFormComponent, resolve: { account: AccountFormResolveService } },
  { path: 'tag-form', component: TagFormComponent },
  { path: 'tag-form/:id', component: TagFormComponent, resolve: { tag: TagFormResolveService } }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);