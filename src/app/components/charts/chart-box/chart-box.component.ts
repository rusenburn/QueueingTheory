import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartModel } from 'src/app/interfaces/chart.interface';
import { Chart, registerables } from 'chart.js';
import { ChartsService } from 'src/app/services/charts.service';
@Component({
  selector: 'app-chart-box',
  templateUrl: './chart-box.component.html',
  styleUrls: ['./chart-box.component.css']
})
export class ChartBoxComponent implements OnInit, AfterViewInit {
  // @Input()
  // set chartModel(v: ChartModel) {
  //   console.log('instantiated');
  //   this.chart = v;
  // }
  // get chartModel(): ChartModel {
  //   return this.chart;
  // }
  @Input() public chart: ChartModel;

  @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement>;
  constructor(
    private _chartsService: ChartsService
  ) { }
  // public pieChart: any;
  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    this._chartsService.createPieChart(this.myCanvas, this.chart.labels, this.chart.data);
  }
}
