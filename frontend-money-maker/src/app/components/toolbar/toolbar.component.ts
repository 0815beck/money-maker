import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Filter } from '../../models/filter';
import { Transaction } from '../../models/transaction';
import { FixedCost } from '../../models/fixed-cost';
import { transition } from '@angular/animations';
import { Category } from '../../models/category';
import { filter } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Input() transactions: Transaction[] = [];
  @Output() transactionUpdated = new EventEmitter<Transaction[]>();

  filters: Filter[] = [
    {label: "Expenses", value: "expenses", checked: false},
    {label: "Incomes", value: "incomes", checked: false},
    {label: "Fixed Costs", value: "fixedCosts", checked: false},
    {label: "Transactions", value: "transactions", checked: false},
  ]

  selectAll: boolean = true;
  searchQuery: string = '';

  ngOnInit(): void {
    if(this.selectAll) {
      this.filters.forEach(filter => filter.checked = true);
    }
    this.filterItems();
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['transactions']){
      console.log(this.transactions);

    }
  }

  onSearchChange(){
    this.filterItems();
  }

  onSelectAllChange(): void {
    if(this.selectAll){
      this.filters.forEach(filter => filter.checked = true);
    } else {
      this.filters.forEach(filter => filter.checked = false);
    }
    this.filterItems();
  }

  onFilterChange(): void {
    this.selectAll = false;
    if(this.filters.every(filter => filter.checked)){
      this.selectAll = true;
    }
    this.filterItems()
  }

  filterItems(): void {
    if(this.filters.every(filter => !filter.checked)){
      this.transactionUpdated.emit(this.transactions);
      return;
    }

    let filteredTransactions = this.transactions.filter(transaction => {

      const isIncome = transaction.amount > 0;
      const isExpense = transaction.amount < 0;
      const isFixedCost = transaction.isFixedCost;
      const isVariableCost = !transaction.isFixedCost;

      const includeExpense = this.filters[0].checked && isExpense;
      const includeIncome = this.filters[1].checked && isIncome;
      const includeFixedCost = this.filters[2].checked && isFixedCost;
      const includeVariableCost = this.filters[3].checked && isVariableCost;

      const typeFilterActive = this.filters[0].checked || this.filters[1].checked;
    const matchesType = 
      (!typeFilterActive) || // Kein Typfilter aktiv, alles wird akzeptiert
      (this.filters[0].checked && isExpense) || // Expenses
      (this.filters[1].checked && isIncome);    // Incomes

    // Logik für Kostenfilter (Fixed und Variable Costs)
    const matchesCost = 
      (this.filters[2].checked && isFixedCost) || // Fixed Costs
      (this.filters[3].checked && isVariableCost) || // Variable Costs
      (!this.filters[2].checked && !this.filters[3].checked); // Kein Kostenfilter aktiv

    //Kategorie-Suche
    const matchesCategory = this.searchQuery.trim() === '' ||
    (transaction.category && transaction.category.name.toLowerCase().includes(this.searchQuery.toLowerCase()));

    // Die Transaktion wird eingeschlossen, wenn sie alle aktiven Filterbedingungen erfüllt
    return matchesType && matchesCost && matchesCategory;

    });

    this.transactionUpdated.emit(filteredTransactions);
    console.log('Filtered Transactions: ', filteredTransactions)
  }



}
