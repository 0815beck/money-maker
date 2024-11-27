import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OverviewTransactionsComponent } from './components/overview-transactions/overview-transactions.component';
import { OverviewFixedCostsComponent } from './components/overview-fixed-costs/overview-fixed-costs.component';
import { OverviewAccountsComponent } from './components/overview-accounts/overview-accounts.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { FixedCostDetailsComponent } from './components/fixed-cost-details/fixed-cost-details.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { FixedCostFormComponent } from './components/fixed-cost-form/fixed-cost-form.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import Chart from 'chart.js/auto';
import { MoneyPipe } from './pipes/money.pipe';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { InterestingPipe } from './pipes/interesting.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    OverviewTransactionsComponent,
    OverviewFixedCostsComponent,
    OverviewAccountsComponent,
    AccountDetailsComponent,
    FixedCostDetailsComponent,
    TransactionDetailsComponent,
    TransactionFormComponent,
    CategoryFormComponent,
    AccountFormComponent,
    FixedCostFormComponent,
    PieChartComponent,
    MoneyPipe,
    InterestingPipe,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
