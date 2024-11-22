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

  deleteAccount(id: number): void{
    this.accountService.deleteAccount(id).subscribe(()=> this.accountService.fetchAccounts());
  }

  showForm(formDisplayed: boolean = this.formDisplayed) {
    this.formDisplayed = !formDisplayed
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
