import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { OperationsComponent } from './operations/operations.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { routing, appRoutingProviders } from './app.routing';
import { AccountService } from './account.service';
import { TagService } from './tag.service';
import { AlertService } from './alert.service';
import { AccountFormResolveService } from './account-form-resolve.service';
import { TagFormResolveService } from './tag-form-resolve.service';
import { OperationFormComponent } from './operation-form/operation-form.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2BootstrapModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
    AppComponent,
    OperationsComponent,
    StatisticsComponent,
    AccountFormComponent,
    TagFormComponent,
    OperationFormComponent
  ],
  providers: [
    appRoutingProviders,
    AccountService,
    TagService,
    AlertService,
    AccountFormResolveService,
    TagFormResolveService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }