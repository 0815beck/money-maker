import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';
import {last, Subject, takeUntil} from 'rxjs';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../services/transaction.service';
import {FixedCost} from '../../models/fixed-cost';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  categoryList: Category[] = [];
  transactionForm: FormGroup;
  newCategory: boolean = false;
  account?: Account;
  destroy = new Subject<void>();
  @Input() selectedTransaction?: Transaction;
  @Output() transactionEvent = new EventEmitter<Transaction>();
  @Output() returnWhenSaved = new EventEmitter<boolean>();

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.transactionForm = this.fb.group({
      id: [],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      timestamp: ['', Validators.required],
      description: [''],
      account: [this.account],
      isFixedCost: false
    });
    accountService.account$.pipe(takeUntil(this.destroy)).subscribe((data) => {
      this.account = data;
      this.transactionForm.get('account')?.patchValue(this.account);
    });
  }

  ngOnChanges() {
    this.fillFormWithDefaultValues();
  }

  ngOnInit() {
    this.initCategories();
  }

  private initCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categoryList = categories;
      this.fillFormWithDefaultValues();
    });
  }

  private fillFormWithDefaultValues() {
    if (!this.selectedTransaction) {
      return;
    }
    if (this.categoryList.length === 0) {
      return;
    }
    const category = this.categoryList?.find(c => c.id === this.selectedTransaction?.category.id);
    this.transactionForm = this.fb.group(
      {
        id: [this.selectedTransaction.id],
        amount: [this.selectedTransaction.amount, Validators.required],
        timestamp: [this.selectedTransaction.timestamp, Validators.required],
        description: [this.selectedTransaction.description],
        category: [category, Validators.required],
        account: [this.selectedTransaction.account],
        isFixedCost: false
      }
    )
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
    const newTransaction: Transaction = this.transactionForm.value;
    console.log(newTransaction);
    if (newTransaction.id === null) {
      this.saveTransaction(newTransaction);
    } else {
      this.modifyTransaction(newTransaction)
    }

  }

  modifyTransaction(newTransaction: Transaction) {
    this.transactionService.modifyTransaction(newTransaction).subscribe(data => {
      console.log('Transaction updated');
      this.accountService.refetchSelectedAccount();
      this.updateTransaction(data)
    })

  }

  saveTransaction(newTransaction: Transaction): void {
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

  updateTransaction(transaction: Transaction) {
    this.transactionEvent.emit(transaction);
  }

  deleteSelectedCategory() {
    const selectedCategory =
      this.transactionForm.get('category')?.value;
    if (selectedCategory) {
      this.categoryService.deleteCategory(selectedCategory.id).subscribe({
        next: () => {
          console.log('Delete Category successfull');
          this.loadCategories();
          this.transactionForm.get('category')?.setValue('');
        },
        error: (error) => {
          console.log('Can not delete Category: ', error);
          alert('Can not delete Category, if it is still in use');
        },
      });
    }
  }
}
