import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Ng2BootstrapModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { routing, appRoutingProviders } from './app.routing';
import { AccountFormComponent } from './account/account-form.component';
import { AccountListComponent } from './account/account-list.component';
import { LoginComponent } from './auth/login.component';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportFormComponent } from './operation/import-form.component';
import { OperationFormComponent } from './operation/operation-form.component';
import { OperationListComponent } from './operation/operation-list.component';
import { FormErrorComponent } from './shared/form-error.component';
import { TagFormComponent } from './tag/tag-form.component';
import { TagListComponent } from './tag/tag-list.component';
import { AccountByIdResolver } from './account/account-by-id.resolver';
import { AccountListResolver } from './account/account-list.resolver';
import { ChartDataListResolver } from './chart/chart-data-list.resolver';
import { OperationByIdResolver } from './operation/operation-by-id.resolver';
import { OperationPaginatedListResolver } from './operation/operation-paginated-list.resolver';
import { TagByIdResolver } from './tag/tag-by-id.resolver';
import { TagListResolver } from './tag/tag-list.resolver';
import { YearMonthResolver } from './operation/year-month.resolver';
import { AuthService } from './auth/auth.service';
import { AccountService } from './account/account.service';
import { AlertService } from './shared/alert.service';
import { FilterService } from './dashboard/filter.service';
import { MapperService } from './shared/mapper.service';
import { OperationService } from './operation/operation.service';
import { TagService } from './tag/tag.service';
import { AuthGuard } from './auth/auth.guard';
import { KeysPipe } from './shared/keys.pipe';
import { MonthNamePipe } from './shared/month-name.pipe';
import { AmountPipe } from './shared/amount.pipe';

export function authFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(AppConfig.JWT_CONFIG), http, options);
};

export const authProvider = {
  provide: AuthHttp,
  deps: [Http, RequestOptions],
  useFactory: authFactory
};

@NgModule({
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    ChartModule,
    DropdownModule.forRoot(),
    FormsModule,
    HttpModule,
    JsonpModule,
    Ng2BootstrapModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AccountFormComponent,
    AccountListComponent,
    AppComponent,
    ChartComponent,
    DashboardComponent,
    FormErrorComponent,
    ImportFormComponent,
    LoginComponent,
    OperationFormComponent,
    OperationListComponent,
    TagFormComponent,
    TagListComponent,

    KeysPipe,
    MonthNamePipe,
    AmountPipe
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    authProvider,

    AccountService,
    AlertService,
    AuthService,
    FilterService,
    MapperService,
    OperationService,
    TagService,

    AccountByIdResolver,
    AccountListResolver,
    ChartDataListResolver,
    OperationByIdResolver,
    OperationPaginatedListResolver,
    TagByIdResolver,
    TagListResolver,
    YearMonthResolver
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }