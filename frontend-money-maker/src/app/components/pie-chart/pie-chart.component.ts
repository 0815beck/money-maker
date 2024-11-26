import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  @Input() data: any;

  chart: any = [];
  colors = [
    'rgb(255, 25, 75)',
    'rgb(0, 233, 225)',
    'rgb(253, 235, 35)',
    'rgb(9,185,24)',
    'rgb(116, 49, 249)',
    'rgb(250, 140, 29)'
  ];

  constructor() {}

  ngOnInit() {
    /* if (!this.data) {
      console.log('[Error] data is undefined');
      return;
    }

    this.data!.datasets[0]!.backgroundColor = this.colors;

    const chartConfig = {
      type: 'pie',
      data: this.data,
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true,},
        },
      }
    }

    this.chart = new Chart('canvas', chartConfig);

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
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });*/
  }

  ngOnChanges() {
    if (!this.data) {
      console.log('[Error] Pie chart data input is undefined.');
      return;
    }
    console.log('[Debug] Pie chart data was updated in the pie chart component. New input: ', this.data);

    this.data.datasets[0].backgroundColor = this.colors;
    this.data.datasets[0].borderWidth = 1;

    const chartConfig = {
      type: 'pie',
      data: this.data,
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true,},
        },
      }
    }

    if(Chart.getChart("canvas")) {
      Chart.getChart("canvas")?.destroy()
    }

    this.chart = new Chart('canvas', chartConfig);
  }
}
