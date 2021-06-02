import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormProviderComponent } from './components/form-provider/form-provider.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryComparisonsComponent } from './components/summary/summary-comparisons/summary-comparisons.component';
import { ChartBoxComponent } from './components/charts/chart-box/chart-box.component';
import { SummaryBoxComponent } from './components/summary/summary-box/summary-box.component';
import { IndexComponent } from './components/index/index.component';
import { QueueCalculatorComponent } from './components/calculator/queue-calculator/queue-calculator.component';
import { CalculatorFormBoxComponent } from './components/calculator/calculator-form-box/calculator-form-box.component';
import { SummaryComponent } from './components/summary/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    FormProviderComponent,
    SummaryComparisonsComponent,
    ChartBoxComponent,
    SummaryBoxComponent,
    IndexComponent,
    QueueCalculatorComponent,
    CalculatorFormBoxComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
