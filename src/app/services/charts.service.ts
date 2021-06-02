import { ElementRef, Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() {
    Chart.register(...registerables);
  }


  public createPieChart(element: ElementRef, labels: string[], data: number[]): any {
    return new Chart(element.nativeElement, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          backgroundColor: ['rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          hoverBorderWidth: 2,
          borderWidth: 1,
          data
        }]
      }
    });
  }

  public createDoughnutChart(element: ElementRef, labels: string[], data: number[]): any {
    return new Chart(element.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          backgroundColor: ['#2ecc71aa', '#3498dbaa', '#3498dbaa '],
          data
        }]
      }
    });
  }
}
