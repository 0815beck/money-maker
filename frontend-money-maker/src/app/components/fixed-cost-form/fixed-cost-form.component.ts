import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {FixedCost} from '../../models/fixed-cost';

@Component({
  selector: 'app-fixed-cost-form',
  templateUrl: './fixed-cost-form.component.html',
  styleUrl: './fixed-cost-form.component.css'
})
export class FixedCostFormComponent {

  today:string;
  fixedCostForm: FormGroup;
  account?: Account;
  categoryList: Category[] = []

  constructor(private fb: FormBuilder, private accountService: AccountService, private categoryService: CategoryService) {
    this.today = new Date().toISOString().split('T')[0];
    accountService.account$.subscribe(data => this.account = data);
    categoryService.getCategories().subscribe(data => this.categoryList = data);
    this.fixedCostForm = this.fb.group(
      {amount: ["", Validators.required],
        start: ["", Validators.required],
        description: [""],
        category:["", Validators.required],
        account:[this.account],
        generatedTransactions:[[]]
      }
    )
  }

  createFixedCost(){
    const fixedCost: FixedCost = this.fixedCostForm.value;

  }

}
