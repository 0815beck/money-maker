import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {
  edit: boolean = false;
  account?: Account;
  name!: FormControl;


  constructor(private accountService: AccountService, private route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get("id");
    if (id) {
      accountService.getAccountByID(id).subscribe(data => {
        this.account = data;
        this.name = new FormControl(this.account.name, Validators.required);
      })
    }
  }

  modifyAccount(){
    if (this.account) {
     this.account.name = this.name?.value;
      this.accountService.modifyAccount(this.account).subscribe(()=> {this.accountService.fetchAccounts(); this.edit=false;})
    }

  }

}
