import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  account$: Observable<Account | undefined>;
  totalIncome$: Observable<number | undefined>;
  totalExpenses$: Observable<number | undefined>;
  balance$: Observable<number | undefined>;
  latestTransactions$: Observable<Transaction[] | undefined>;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {
    this.account$ = accountService.getAccount();
    this.totalIncome$ = transactionService.getTotalIncome();
    this.totalExpenses$ = transactionService.getTotalExpense();
    this.balance$ = transactionService.getTotalBalance();
    this.latestTransactions$ = transactionService.getLatestTransactions();
  }

}
