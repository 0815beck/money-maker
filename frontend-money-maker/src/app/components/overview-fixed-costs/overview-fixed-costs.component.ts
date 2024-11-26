import {Component, Input} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';
import {FixedCost} from '../../models/fixed-cost';
import {FixedCostService} from '../../services/fixed-cost.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-overview-fixed-costs',
  templateUrl: './overview-fixed-costs.component.html',
  styleUrl: './overview-fixed-costs.component.css'
})
export class OverviewFixedCostsComponent {
  @Input() inputAccount?: Account;
  formDisplayed: boolean = false;
  account?: Account;
  fixedCosts: FixedCost[] = [];
  destroy = new Subject<void>();

  constructor(private fixedCostService: FixedCostService, private accountService: AccountService) {
    this.accountService.account$.pipe(takeUntil(this.destroy)).subscribe(data => {
      this.account = data;
      if (this.account){
      this.fixedCosts = this.account.fixedCosts;}})
  }

  ngOnChanges(): void{
    if (this.inputAccount){
      this.destroy.next();
      this.account = this.inputAccount;
      this.fixedCosts = this.account.fixedCosts;
    }
  }


  deleteFixedCost(fixedCost: FixedCost): void{
    if (fixedCost.id != null) {
      this.fixedCostService.deleteFixedCost(fixedCost.id).subscribe(() => this.accountService.fetchAccounts())
      if (this.inputAccount){
        this.fixedCosts = this.fixedCosts.filter(element => element.id!=fixedCost.id);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
