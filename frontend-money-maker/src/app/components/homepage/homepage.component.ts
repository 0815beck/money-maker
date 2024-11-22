import { Component } from '@angular/core';
import { first, Observable, Subject, takeUntil } from 'rxjs';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  accounts: Account[] | undefined;
  account: Account | undefined;

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
    this.selectedStartDate = this.dateToString(new Date(today.getFullYear() - 1, 1, 1));
    //  .toISOString().split('T')[0];

    //this.selectedEndDate = today.toISOString().split('T')[0];
    this.selectedEndDate = this.dateToString(today);

    accountService.accounts$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(accounts => {
      this.accounts = accounts;
    })
    accountService.account$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(account => {
      this.account = account;
      this.transactions = this.account?.transactions;
      this.computeStats();
    })

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

    console.log('[Debug] all transaction of the selected user are: ', this.transactions);
    console.log('[Debug] The selected start date is: ', this.selectedStartDate);
    console.log('[Debug] The selected end date is: ', this.selectedEndDate);

    const transactionsUntilEndDate = this.transactions
      ?.filter(transaction => new Date(transaction.timestamp) <= new Date(this.selectedEndDate));

    const relevantTransactions = transactionsUntilEndDate
      ?.filter(transaction => new Date(this.selectedStartDate) <= new Date(transaction.timestamp));

    console.log('[Debug] The relevant transactions in the selected time frame are: ', relevantTransactions);

    if (!relevantTransactions) {
      return;
    }
    
    let totalExpenses = 0;
    let totalIncome = 0;
    for(let transaction of relevantTransactions) {
      if (transaction.amount < 0) {
        totalExpenses += transaction.amount;
      } else {
        totalIncome += transaction.amount;
      }
    }

    console.log('[Debug] The total expenses are: ' + totalExpenses);
    console.log('[Debug] The total income is: ' + totalIncome);
    this.totalExpenses = totalExpenses;
    this.totalIncome = totalIncome;

    if (!transactionsUntilEndDate) {
      return;
    }

    let balance = 0;
    for(let transaction of transactionsUntilEndDate) {
      balance += transaction.amount;
    }

    console.log('[Debug] The balance at the end date is: ' + balance);
    this.balance = balance;


//Compute expenses per category:
//IN ARBEIT!!!!
    let pairs : {catName: string, total: number}[] = []
    let map = new Map<string, number>();
    map = relevantTransactions.reduce<Map<string, number>>((currentMap, nextTransaction) => {
      const key = nextTransaction.category.name;
      if (nextTransaction.amount >= 0) {
        return currentMap;
      }
      if (currentMap.has(key)) {
        currentMap.set(key, currentMap.get(key)! + nextTransaction.amount)
      } else {
        currentMap.set(key, nextTransaction.amount);
      }
      return currentMap;
    }, map);

    let array

    let expensesData = {
      labels: ['Miete', 'Lebensmittel', 'Kleidung', 'Unterhaltung', 'Fahrtkosten', 'Sonstiges'],
      datasets: [
        {
          label: 'Ausgaben',
          data: [12, 19, 3, 5, 2, 3]
        },
      ],
    }
    this.expensesData = expensesData
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


