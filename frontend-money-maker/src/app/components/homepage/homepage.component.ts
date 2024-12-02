import { Component } from '@angular/core';
import { first, Observable, Subject, takeUntil } from 'rxjs';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { Category } from '../../models/category';
import { barChartData, ChartData, pieChartData, stats, Stats } from '../../utils/statistics';
import { toString } from '../../utils/date';
import { getRandomWisdom, Wisdom } from '../../utils/wisdom';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  accounts: Account[] | undefined;
  account: Account | undefined;
  id: number | undefined;

  selectedStartDate: string;
  selectedEndDate: string;

  transactions: Transaction[] | undefined;

  totalIncome: number | undefined;
  totalExpenses: number | undefined;
  balance: number | undefined;

  expensesData: ChartData | undefined;
  historyData: ChartData | undefined;

  wisdom: Wisdom | undefined;

  constructor(
    private accountService: AccountService
  ) {

    let today = new Date();
    this.selectedStartDate = 
      toString(new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()));
    this.selectedEndDate = toString(today);

    accountService.accounts$.pipe(takeUntil(this.destroy)).subscribe(accounts => {
      this.accounts = accounts;
    });

    accountService.account$.pipe(takeUntil(this.destroy)).subscribe(account => {
      this.account = account;
      this.id = account?.id;
      this.transactions = this.account?.transactions;
      this.computeStats();
    });

    this.wisdom = getRandomWisdom();
  }

  changeAccount(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === "undefined") {
      this.accountService.setSelectedAccountToUndefined();
      return;
    }
    this.accountService.setSelectedAccount(parseInt(selectedValue));
    this.wisdom = getRandomWisdom();
  }

  computeStats() {
    const start = new Date(this.selectedStartDate);
    const end = new Date(this.selectedEndDate);

    if (!this.transactions) { return; }

    const statistic: Stats = stats(start, end, this.transactions);

    this.balance = statistic.balance;
    this.totalExpenses = statistic.expenses;
    this.totalIncome = statistic.income;

    const expensesData = pieChartData(start, end, this.transactions);
    this.expensesData = expensesData;

    const historyData = barChartData(end, this.transactions);
    this.historyData = historyData;
  }

  private destroy = new Subject<void>();

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}


