import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  chart: any = [];

  constructor() {}

  ngOnInit() {
    Chart.defaults.color = '#501a56';
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: ['Miete', 'Lebensmittel', 'Kleidung', 'Unterhaltung', 'Fahrtkosten', 'Sonstiges'],
        datasets: [
          {
            label: 'Ausgaben',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgb(255, 25, 75)',
              'rgb(0, 233, 225)',
              'rgb(253, 235, 35)',
              'rgb(9, 185, 185)',
              'rgb(116, 49, 249)',
              'rgb(250, 140, 29)'
          ],
            borderWidth: 1
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
