import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
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

  accounts: Account[] | undefined;
  account: Account | undefined;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {
    accountService.accounts$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(accounts => {
      this.accounts = accounts;
    })
    accountService.account$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(account => {
      this.account = account;
    })
  }


//unsubscribe logic
  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

}
