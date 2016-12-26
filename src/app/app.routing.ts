import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations/operations.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountResolve } from './account.resolver';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagResolve } from './tag.resolver';
import { OperationFormComponent } from './operation-form/operation-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OperationResolve } from './operation.resolver';
import { TagsResolve } from './tags.resolver';
import { AuthGuard } from './auth.guard';
import { AccountsResolve } from './accounts.resolver';
import { ImportFormComponent } from './import-form/import-form.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ], children: [
    { path: '', component: OperationsComponent },
    { path: 'operations', component: OperationsComponent },
    { path: 'import-form', component: ImportFormComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'account-form', component: AccountFormComponent },
    { path: 'account-form/:id', component: AccountFormComponent, resolve: { account: AccountResolve } },
    { path: 'tag-form', component: TagFormComponent },
    { path: 'tag-form/:id', component: TagFormComponent, resolve: { tag: TagResolve } },
    { path: 'operation-form', component: OperationFormComponent, resolve: { tags: TagsResolve, accounts: AccountsResolve } },
    { path: 'operation-form/:id', component: OperationFormComponent, resolve: { operation: OperationResolve, accounts: AccountsResolve, tags: TagsResolve } }
  ] },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);