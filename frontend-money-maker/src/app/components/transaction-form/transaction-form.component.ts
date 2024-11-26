import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';
import { last, Subject, takeUntil } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  categoryList!: Category[];
  transactionForm!: FormGroup;
  newCategory: boolean = false;
  account?: Account;
  destroy = new Subject<void>();

  @Output() returnWhenSaved = new EventEmitter<boolean>();

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', Validators.required],
      selectedCategory: ['', Validators.required],
      timestamp: ['', Validators.required],
      description: [''],
      account: [this.account],
    });
    accountService.account$.pipe(takeUntil(this.destroy)).subscribe((data) => {
      this.account = data;
      this.transactionForm.get('account')?.patchValue(this.account);
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        setTimeout(() => 'Loading ...', 4000);
        this.categoryList = data;
      },
      error: (error) => {
        console.log('Fehler beim Laden der Categorien: ', error);
      },
    });
  }

  changeToCategoryForm() {
    if (!this.newCategory) {
      this.newCategory = true;
    } else {
      this.newCategory = false;
    }
  }

  return(boolean: boolean) {
    this.newCategory = boolean;
    this.loadCategories();
    this.transactionForm.get('selectedCategory')?.setValue('');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onSubmit() {
    const newTransaction: Transaction = {
      amount: this.transactionForm.get('amount')?.value,
      timestamp: this.transactionForm.get('timestamp')?.value,
      category: this.transactionForm.get('selectedCategory')?.value,
      account: this.transactionForm.get('account')?.value,
    };

    console.log(newTransaction);

    this.transactionService.addTransaction(newTransaction).subscribe({
      next: () => {
        console.log('Transaction saved');
        this.accountService.refetchSelectedAccount();
        this.returnToOverview('Saved');
      },
      error: (error) => {
        console.log('Can not save Transaction', error);
      },
    });
  }

  returnToOverview(String: any) {
    this.returnWhenSaved.emit();
    console.log(String);
  }

  deleteSelectedCategory() {
    const selectedCategory =
      this.transactionForm.get('selectedCategory')?.value;
    if (selectedCategory) {
      this.categoryService.deleteCategory(selectedCategory.id).subscribe({
        next: () => {
          console.log('Delete Category successfull');
          this.loadCategories();
          this.transactionForm.get('selectedCategory')?.setValue('');
        },
        error: (error) => {
          console.log('Can not delete Category: ', error);
          alert('Can not delete Category, if it is still in use');
        },
      });
    }
  }
}
