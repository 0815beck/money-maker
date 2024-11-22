import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  categoryList!: Category[];
  transactionForm!: FormGroup;
  newCategory: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      amount: [0, Validators.required],
      category: ['', Validators.required],
      date: [Date, Validators.required],
      description: ['', Validators.required],
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
    this.loadCategories();
  }
}
