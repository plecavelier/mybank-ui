import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { OperationsComponent } from './operations/operations.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routing';
import { AccountService } from './account.service';
import { TagService } from './tag.service';
import { AlertService } from './alert.service';
import { AccountFormResolveService } from './account-form-resolve.service';
import { TagFormResolveService } from './tag-form-resolve.service';
import { OperationFormComponent } from './operation-form/operation-form.component';
import { OperationService } from './operation.service';
import { OperationFormResolveService } from './operation-form-resolve.service';
import { SecurityService } from './security.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    Ng2BootstrapModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
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
    TagFormResolveService,
    OperationService,
    OperationFormResolveService,
    AuthGuard,
    SecurityService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }