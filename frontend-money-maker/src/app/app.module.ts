import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OverviewTransactionsComponent } from './components/overview-transactions/overview-transactions.component';
import { OverviewFixedCostsComponent } from './components/overview-fixed-costs/overview-fixed-costs.component';
import { OverviewAccountsComponent } from './components/overview-accounts/overview-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    OverviewTransactionsComponent,
    OverviewFixedCostsComponent,
    OverviewAccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
