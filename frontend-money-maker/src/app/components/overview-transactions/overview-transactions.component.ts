import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Transaction } from '../../models/transaction';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-overview-transactions',
  templateUrl: './overview-transactions.component.html',
  styleUrl: './overview-transactions.component.css',
})
export class OverviewTransactionsComponent {
  formDisplayed: boolean = false;
  accountTransactions?: Transaction[];
  account?: Account;
  destroy = new Subject<void>();

  constructor(private accountService: AccountService) {
    accountService.account$.pipe(takeUntil(this.destroy)).subscribe((data) => {
      this.account = data;
    });
  }

  ngOnInit() {
    this.loadTransactions();
  }

  showForm() {
    if (!this.formDisplayed) {
      this.formDisplayed = true;
    } else {
      this.formDisplayed = false;
    }
  }

  loadTransactions() {
    this.accountTransactions = this.account?.transactions;
  }

  transactionSaved(String: any) {
    this.showForm();
    this.loadTransactions();
  }
}
