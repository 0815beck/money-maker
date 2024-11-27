import { Pipe, PipeTransform } from '@angular/core';
import { ChartData } from '../utils/statistics';

@Pipe({
  name: 'interesting'
})
export class InterestingPipe implements PipeTransform {

  transform(chartData: ChartData | undefined): boolean {
    if (!chartData) {
      return false;
    }
    let interesting = false;
    for (let dataset of chartData.datasets) {
      for (let dataPoint of dataset.data) {
        if(dataPoint !== 0) { interesting = true; }
      }
    }
    return interesting;
  }

}
