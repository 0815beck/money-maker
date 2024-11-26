import { Component } from '@angular/core';
import { first, Observable, Subject, takeUntil } from 'rxjs';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { Category } from '../../models/category';
import { pieChartData, stats, Stats } from '../../utils/statistics';
import { toString } from '../../utils/date';

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

  expensesData: any;

  constructor(
    private accountService: AccountService
  ) {

    let today = new Date();
    this.selectedStartDate = toString(new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()));
    //  .toISOString().split('T')[0];

    //this.selectedEndDate = today.toISOString().split('T')[0];
    this.selectedEndDate = toString(today);

    accountService.accounts$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(accounts => {
      this.accounts = accounts;
    });

    accountService.account$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(account => {
      this.account = account;
      this.id = account?.id;
      this.transactions = this.account?.transactions;
      this.computeStats();
    });

    //transactionService.getTransactions().subscribe(transactions => {
    //  this.transactions = transactions;
    //  this.computeStats();
    //})
  }

  changeAccount(event: Event) {
    console.log('[Debug] changeAccount event handler triggered')
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === "undefined") {
      this.accountService.setSelectedAccountToUndefined();
      return;
    }
    this.accountService.setSelectedAccount(parseInt(selectedValue));
  }

  computeStats() {
    const start = new Date(this.selectedStartDate);
    const end = new Date(this.selectedEndDate);

    if (!this.transactions) { return; }

    const statistic: Stats = stats(start, end, this.transactions);

    console.log('[Debug] statistic has been computed', statistic);
    this.balance = statistic.balance;
    this.totalExpenses = statistic.expenses;
    this.totalIncome = statistic.income;

    const expensesData = pieChartData(start, end, this.transactions);

    console.log('[Debug] Data for the Pie Chart has been computed.', expensesData);
    /*let expensesData = {
      labels: ['Miete', 'Lebensmittel', 'Kleidung', 'Unterhaltung', 'Fahrtkosten', 'Sonstiges'],
      datasets: [
        {
          label: 'Ausgaben',
          data: [12, 19, 3, 5, 2, 3]
        },
      ],
    }*/
    this.expensesData = expensesData;
  }

//unsubscribe logic
  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private dateToString(date: Date): string {
    console.log('[Debug] dateToSting called. Input: ', date);
    console.log('[Debug] the number of days is: ' + date.getDate())
    const temp =  `${date.getFullYear()}` + 
      `-${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}` +
      `-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    console.log('[Debug] dateToString will return', temp);
    return temp;
  }
}


