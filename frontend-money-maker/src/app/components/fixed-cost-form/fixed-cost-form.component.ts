import { Component } from '@angular/core';

@Component({
  selector: 'app-fixed-cost-form',
  templateUrl: './fixed-cost-form.component.html',
  styleUrl: './fixed-cost-form.component.css'
})
export class FixedCostFormComponent {

  today:string;

  constructor() {
    this.today = new Date().toISOString().split('T')[0];
  }

}
