import { Component } from '@angular/core';
import {Account} from '../../models/account';
import {FixedCost} from '../../models/fixed-cost';
import {ActivatedRoute} from '@angular/router';
import {FixedCostService} from '../../services/fixed-cost.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-fixed-cost-details',
  templateUrl: './fixed-cost-details.component.html',
  styleUrl: './fixed-cost-details.component.css'
})
export class FixedCostDetailsComponent {
  edit: boolean = false;
  fixedCost?: FixedCost;

  constructor(private route: ActivatedRoute, private fixedCostService: FixedCostService, private accountService: AccountService) {
    const id = route.snapshot.paramMap.get("id");
    if(id){
      fixedCostService.findFixedCostByID(id).subscribe(data => this.fixedCost = data);
    }
  }

}
