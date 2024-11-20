import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';

@Component({
  selector: 'app-fixed-cost-form',
  templateUrl: './fixed-cost-form.component.html',
  styleUrl: './fixed-cost-form.component.css'
})
export class FixedCostFormComponent {

  today:string;
  fixedCostForm: FormGroup;
  account?: Account;

  constructor(private fb: FormBuilder, accountService: AccountService) {
    this.today = new Date().toISOString().split('T')[0];
    accountService.account$.subscribe(data => this.account = data);
    this.fixedCostForm = this.fb.group(
      {amount: ["", Validators.required],
        start: [new Date(), Validators.required],
        description: [""],
        category:["", Validators.required],
        account:[this.account],
        generatedTransactions:[[]]
      }
    )
  }

}
