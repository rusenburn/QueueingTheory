import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProviderComponent } from './components/form-provider/form-provider.component';
import { IndexComponent } from './components/index/index.component';
import { QueueCalculatorComponent } from './components/calculator/queue-calculator/queue-calculator.component';
import { SummaryComponent } from './components/summary/summary/summary.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'byCalc', component: QueueCalculatorComponent },
  { path: 'byForm', component: FormProviderComponent },
  { path: 'summary/results', component: SummaryComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', redirectTo: '/index' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
