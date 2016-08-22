import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  imports: [
  	BrowserModule,
  	ReactiveFormsModule,
  	NgbModule,
  	routing
  ],
  declarations: [
  	AppComponent,
  	AccountFormComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }