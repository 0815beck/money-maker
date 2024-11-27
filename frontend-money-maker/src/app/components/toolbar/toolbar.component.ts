import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Filter } from '../../models/filter';
import { Transaction } from '../../models/transaction';
import { FixedCost } from '../../models/fixed-cost';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Input() transactions: Transaction[] = [];
  @Input() fixedCosts: FixedCost[] = [];
  @Output() transactionUpdated = new EventEmitter<Transaction[]>();

  filters: Filter[] = [
    {label: "Expenses", value: "expenses", checked: false},
    {label: "Incomes", value: "incomes", checked: false},
    {label: "Fixed Costs", value: "ixedCosts", checked: false},
    {label: "Transactions", value: "transactions", checked: false},
  ]
  selectAllChecked = false;

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['transactions'] && this.transactions.length >0){
      console.log(this.transactions);
    }
    if(changes['fixedCosts'] && this.fixedCosts.length >0){
      console.log(this.fixedCosts);
    }
  }

  toggleSelectAll(){
    this.filters.forEach(filter => filter.checked = this.selectAllChecked);
  }

  updateSelectAllState(){
    this.selectAllChecked = this.filters.every(filter => filter.checked)
  }

  filterItems(type: string): void {
    let filteredItems;
    if(this.transactions.length > 0){
      
    }
  }

}
