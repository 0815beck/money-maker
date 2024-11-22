import { Component } from '@angular/core';
import {Account} from '../../models/account';
import {AccountService} from '../../services/account.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-overview-accounts',
  templateUrl: './overview-accounts.component.html',
  styleUrl: './overview-accounts.component.css'
})
export class OverviewAccountsComponent {
  formDisplayed: boolean = false;
  accounts: Account[] | undefined =[];
  destroy = new Subject<void>();


  constructor(private accountService: AccountService) {
    accountService.accounts$.pipe(takeUntil(this.destroy)).subscribe(data => {
      return this.accounts = data;
    })
  }

  deleteAccount(account: Account): void{
    if (account.fixedCosts.length != 0 || account.transactions.length !=0){
      window.alert("The account is still linked to at least one transaction or fixed cost and therefor cannot be deleted. Please delete any fixed costs or transactions belonging to this account first.");
      return;
    }
    if (account.id){
    this.accountService.deleteAccount(account.id).subscribe(()=> this.accountService.fetchAccounts());}
  }

  showForm(formDisplayed: boolean = this.formDisplayed) {
    this.formDisplayed = !formDisplayed
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
