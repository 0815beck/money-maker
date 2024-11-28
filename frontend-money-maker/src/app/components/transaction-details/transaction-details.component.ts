import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../../services/account.service';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {
  edit: boolean = false;
  transaction?: Transaction;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private accountService: AccountService) {
    const id = route.snapshot.paramMap.get("id");
    if (id) {
      transactionService.getTransactionByID(id).subscribe(data => this.transaction = data);
    }
  }
}
