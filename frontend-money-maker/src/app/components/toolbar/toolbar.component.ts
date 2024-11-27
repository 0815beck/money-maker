import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Filter } from '../../models/filter';
import { Transaction } from '../../models/transaction';
import { FixedCost } from '../../models/fixed-cost';
import { transition } from '@angular/animations';
import { Category } from '../../models/category';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Input() transactions: Transaction[] = [];
  @Output() transactionUpdated = new EventEmitter<Transaction[]>();

  filterCategory?: Category;
  filterFixedCost: boolean = false;
  filterTransactions: boolean = false;
  filterIncome: boolean = false;
  filterExpense: boolean = false;

  filters: Filter[] = [
    {label: "Expenses", value: "expenses", checked: false},
    {label: "Incomes", value: "incomes", checked: false},
    {label: "Fixed Costs", value: "ixedCosts", checked: false},
    {label: "Transactions", value: "transactions", checked: false},
    {label: "Category", value: "category", checked: false}
  ]
  selectAllChecked = false;

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['transactions'] && this.transactions.length >0){
      console.log(this.transactions);
    }
  }

  toggleSelectAll(){
    this.filters.forEach(filter => filter.checked = this.selectAllChecked);
  }

  updateSelectAllState(){
    this.selectAllChecked = this.filters.every(filter => filter.checked)
  }

  filterItems(): void {
    let filteredTransactions = this.transactions;
    if(this.filterIncome) {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.amount > 0);
    }
    if(this.filterExpense){
      filteredTransactions = filteredTransactions.filter(transaction => transaction.amount < 0);
    }

    if(this.filterCategory){
      filteredTransactions = filteredTransactions.filter(transaction => this.filterCategory === transaction.category);
    }

    if(this.filterFixedCost){
      filteredTransactions = filteredTransactions.filter(transaction => this.filterFixedCost === transaction.isFixedCost )
    }

    if(this.filterTransactions){
      filteredTransactions = filteredTransactions.filter(transaction => this.filterTransactions === !transaction.isFixedCost)
    }

    this.transactionUpdated.emit(filteredTransactions);
    console.log('Filtered Transactions: ', filteredTransactions)



  }

}
