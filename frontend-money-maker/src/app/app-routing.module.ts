import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OverviewTransactionsComponent } from './components/overview-transactions/overview-transactions.component';
import { OverviewFixedCostsComponent } from './components/overview-fixed-costs/overview-fixed-costs.component';
import { OverviewAccountsComponent } from './components/overview-accounts/overview-accounts.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { FixedCostFormComponent } from './components/fixed-cost-form/fixed-cost-form.component';
import { FixedCostDetailsComponent } from './components/fixed-cost-details/fixed-cost-details.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'transactions', component: OverviewTransactionsComponent },
  { path: 'transactions/new', component: TransactionFormComponent },
  { path: 'transactions/:id', component: TransactionDetailsComponent },
  { path: 'fix-costs', component: OverviewFixedCostsComponent },
  { path: 'fix-costs/new', component: FixedCostFormComponent },
  { path: 'fix-costs/:id', component: FixedCostDetailsComponent },
  { path: 'accounts', component: OverviewAccountsComponent },
  { path: 'accounts/new', component: AccountFormComponent },
  { path: 'accounts/:id', component: AccountDetailsComponent },
  { path: 'categories/new', component: CategoryFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
