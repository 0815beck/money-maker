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

}

