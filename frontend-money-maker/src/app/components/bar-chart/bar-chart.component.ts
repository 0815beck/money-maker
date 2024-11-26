import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
          {
            label: "Income",
            data: ["500", "200", "600", "20"],
            backgroundColor: "green",
          },
          {
            label: "Expenses",
            data: ["-300", "-240", "-30", "-540"],
            backgroundColor: "red",
          },
          {
            label: "Total",
            data: ["200", "-40", "570", "-520"],
            backgroundColor: "blue",
          },
        ]
      },
      options: {
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true,},
        },
        indexAxis: 'y',
        aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: "Last Four Months",
            font: {
              size: 18,
              weight: 'bold',
            }
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
              }
            }
          },
        },
      }
    });
  }
}

