import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';
import {Subject, takeUntil} from 'rxjs';

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


  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.transactionForm = this.fb.group({
      amount: ["", Validators.required],
      category: ['', Validators.required],
      date: ["", Validators.required],
      description: [''],
      account: [this.account]
    });
    accountService.account$.pipe(takeUntil(this.destroy)).subscribe(data => {
      this.account = data;
      this.transactionForm.get("account")?.patchValue(this.account);
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
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
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
