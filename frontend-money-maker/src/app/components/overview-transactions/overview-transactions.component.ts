import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-transactions',
  templateUrl: './overview-transactions.component.html',
  styleUrl: './overview-transactions.component.css',
})
export class OverviewTransactionsComponent {
  formDisplayed: boolean = false;

  showForm() {
    if (!this.formDisplayed) {
      this.formDisplayed = true;
      console.log(true);
    } else {
      this.formDisplayed = false;
      console.log(false);
    }
  }
}
