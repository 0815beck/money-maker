import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
import { toString } from '../../utils/date';

//Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  @Input() data: any;
  @Input() start: string | undefined;
  @Input() end: string | undefined;

  chart: any;
  
  colors = [
    'rgb(255, 25, 75)',
    'rgb(0, 233, 225)',
    'rgb(253, 235, 35)',
    'rgb(9,185,24)',
    'rgb(116, 49, 249)',
    'rgb(250, 140, 29)'
  ];

  constructor() {}

  ngOnChanges() {
    if (!this.data || !this.start || !this.end) {
      console.log('[Error] Pie chart data input is undefined.');
      return;
    }

    this.data.datasets[0].backgroundColor = this.colors;
    this.data.datasets[0].borderWidth = 1;

    let config: any = {};
    
    config.type = 'pie';
    config.data = this.data;
    config.options = {};
    config.options.aspectRatio = 1;
    config.options.responsive = true;
    config.options.scales = {
      x: { beginAtZero: true, grid: {display: false}, display: false },
      y: { beginAtZero: true, grid: {display: false}, display: false }
    };
    config.options.plugins = {};
    config.options.plugins.title = {
      display: true,
      text: 'Expenses ' + 'between '+ this.start + ' and ' + this.end,
      font: { size: 18, weight: 'bold' }
    };

    if(Chart.getChart("canvas")) {
      Chart.getChart("canvas")?.destroy()
    }

    this.chart = new Chart("canvas", config);
  }
}