import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Transaction } from '../../models/transaction';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-overview-transactions',
  templateUrl: './overview-transactions.component.html',
  styleUrl: './overview-transactions.component.css',
})
export class OverviewTransactionsComponent {
  @Input() inputAccount?: Account;
  formDisplayed: boolean = false;
  transactions?: Transaction[];
  account?: Account;
  destroy = new Subject<void>();

  constructor(private accountService: AccountService, private transactionService: TransactionService) {
    accountService.account$.pipe(takeUntil(this.destroy)).subscribe((data) => {
      this.account = data;
      this.loadTransactions();
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnChanges(): void{
    if(this.inputAccount){
      this.destroy.next();
      this.account = this.inputAccount;
      this.transactions = this.account.transactions;
    }
  }

  showForm() {
    if (!this.formDisplayed) {
      this.formDisplayed = true;
    } else {
      this.formDisplayed = false;
    }
  }

  loadTransactions() {
    if(this.account){
      this.transactions = this.account?.transactions;
    }
  }

  transactionSaved(event: any) {
    this.showForm();
    this.loadTransactions();
  }

  deleteTransaction(transaction: Transaction){
    if(transaction.id != null){
            this.transactionService.deleteTransaction(transaction.id).subscribe({
        next: () => {
          this.accountService.fetchAccounts();
          console.log('Transaction deleted!')
        },
        error: (error) => {
          console.log('Could not delete Transaction: ', error);
          alert('Cannot delete Transation, due to Fixed Cost');
        }
      });
      if(this.inputAccount){
        this.transactions = this.transactions?.filter(element => element.id =transaction.id);
      }
    }

  }
}
