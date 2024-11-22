import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {FixedCost} from '../../models/fixed-cost';
import {FixedCostService} from '../../services/fixed-cost.service';
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from '../../models/transaction';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-fixed-cost-form',
  templateUrl: './fixed-cost-form.component.html',
  styleUrl: './fixed-cost-form.component.css'
})
export class FixedCostFormComponent implements OnDestroy {

  today: string;
  fixedCostForm: FormGroup;
  account?: Account;
  categoryList: Category[] = [];
  destroy = new Subject<void>();

  constructor(private fb: FormBuilder, private accountService: AccountService, private categoryService: CategoryService, private fixedCostService: FixedCostService, private transactionService: TransactionService) {
    this.today = new Date().toISOString().split('T')[0];
    this.fixedCostForm = this.fb.group(
      {
        amount: ["", Validators.required],
        start: ["", Validators.required],
        description: [""],
        category: ["", Validators.required],
        account: [this.account],
        generatedTransactions: [[]]
      }
    )
    categoryService.getCategories().subscribe(data => this.categoryList = data);
    accountService.account$.pipe(takeUntil(this.destroy)).subscribe(data => {
      this.account = data;
      this.fixedCostForm.get("account")?.patchValue(this.account);
    });


  }

  createFixedCost(): void {

    const fixedCost: FixedCost = this.fixedCostForm.value;
    if (new Date(fixedCost.start).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
      let transaction: Transaction = {
        amount: fixedCost.amount,
        account: fixedCost.account,
        category: fixedCost.category,
        description: fixedCost.description,
        timestamp: new Date()
      }
      this.transactionService.addTransaction(transaction).subscribe(data => {
        transaction = data;
        fixedCost.generatedTransactions.push(transaction);
        this.saveFixedCost(fixedCost)
      });
    } else {
      this.saveFixedCost(fixedCost);
    }

  }

  saveFixedCost(fixedCost: FixedCost): void {
    this.fixedCostService.addFixedCost(fixedCost).subscribe((data) => {
      this.accountService.fetchAccounts();
      this.accountService.refetchSelectedAccount();
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
