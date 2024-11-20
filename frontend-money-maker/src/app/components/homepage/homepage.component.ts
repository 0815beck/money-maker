import { Component } from '@angular/core';
import { first, Observable, Subject, takeUntil } from 'rxjs';
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

  selectedStartDate: string;
  selectedEndDate: string;

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

    let today = new Date();
    this.selectedStartDate = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString().split('T')[0];
    this.selectedEndDate = today.toISOString().split('T')[0];
  }


  changeAccount(event: Event) {
    console.log('[Debug] event triggered')
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === "undefined") {
      this.accountService.setSelectedAccountToUndefined();
      return;
    }
    this.accountService.setSelectedAccount(parseInt(selectedValue));
  }

//unsubscribe logic
  private ngUnsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

}
