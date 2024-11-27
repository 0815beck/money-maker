import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;

  ngOnChanges() {
    if (!this.data) {
      return;
    }

    //See pie-chart.component.css for the color selection
    this.data.datasets[0].backgroundColor = "rgb(9, 185, 24)";
    this.data.datasets[1].backgroundColor = "rgb(255, 25, 75)";
    this.data.datasets[2].backgroundColor = "rgb(116, 49, 249)";

    const config: any = {};
    config.type = 'bar';
    config.data = this.data;
    config.options = {};
    config.options.scales = {
      x: { beginAtZero: true },
      y: { beginAtZero: true, ticks: { align: 'center' }},
    };
    config.options.indexAxis = 'x';
    config.options.aspectRatio = 1;
    config.options.plugins = {};
    config.options.plugins.title = {
      display: true,
      text: "History",
      font: { size: 18, weight: 'bold' }
    };
    config.options.plugins.legend = {
      display: true,
      labels: { font: { size: 14 } }
    };

    if(Chart.getChart("MyChart")) {
      Chart.getChart("MyChart")?.destroy()
    }

    this.chart = new Chart("MyChart", config);
  }

  /*
  createChart() {
    const data: any = {};
    data.labels = ['January', 'February', 'March', 'April'];
    data.datasets = [
      {
        label: "Income",
        data: ["500", "200", "600", "20"],
      }, 
      {
        label: "Expenses",
        data: ["-300", "-240", "-30", "-540"],
      },
      {
        label: "Total",
        data: ["200", "-40", "570", "-520"],
      },
    ]

    //See pie-chart.component.css for the color selection
    data.datasets[0].backgroundColor = "rgb(9, 185, 24)";
    data.datasets[1].backgroundColor = "rgb(255, 25, 75)";
    data.datasets[2].backgroundColor = "rgb(116, 49, 249)";

    const config: any = {};
    config.type = 'bar';
    config.data = data;
    config.options = {};
    config.options.scales = {
      x: { beginAtZero: true },
      y: { beginAtZero: true,},
    };
    config.options.indexAxis = 'y';
    config.options.aspectRatio = 1;
    config.options.plugins = {};
    config.options.plugins.title = {
      display: true,
      text: "History",
      font: { size: 18, weight: 'bold' }
    };
    config.options.plugins.legend = {
      display: true,
      labels: { font: { size: 14 } }
    };

    this.chart = new Chart("MyChart", config);
  }*/
}

