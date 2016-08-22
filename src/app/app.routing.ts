import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations/operations.component';
import { StatisticsComponent } from './statistics/statistics.component';

const appRoutes: Routes = [
  { path: '', component: OperationsComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'statistics', component: StatisticsComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);