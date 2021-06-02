import { Component, Input, OnInit } from '@angular/core';
import { ChartModel } from 'src/app/interfaces/chart.interface';
import { CaseSummary } from 'src/app/models/caseSummary.model';

@Component({
  selector: 'app-summary-box',
  templateUrl: './summary-box.component.html',
  styleUrls: ['./summary-box.component.css']
})
export class SummaryBoxComponent implements OnInit {
  @Input()
  caseSummary: CaseSummary;
  public probabilitiesChart: ChartModel;
  public lengthsChart: ChartModel;
  public waitingsChart: ChartModel;

  constructor() { }
  ngOnInit(): void {
    this.assignCharts();
  }

  private assignCharts(): void {
    this.lengthsChart = this.getLengthChart();
    this.waitingsChart = this.getWaitingChart();
    this.probabilitiesChart = this.getProbabilitesChart();
  }
  private getLengthChart(): ChartModel {
    const chart: ChartModel = { labels: [], data: [] };
    const labels = ['Lq'];
    const data = [this.caseSummary.queueLength, this.caseSummary.systemLength - this.caseSummary.queueLength];
    chart.data = data;
    chart.labels = labels;
    return chart;
  }

  private getWaitingChart(): ChartModel {
    const chart: ChartModel = { labels: [], data: [] };
    const labels = ['Queue', 'Server'];
    const data = [this.caseSummary.queueWaitingTime, this.caseSummary.systemWaitingTime - this.caseSummary.queueWaitingTime];
    chart.data = data;
    chart.labels = labels;
    return chart;
  }

  private getProbabilitesChart(): ChartModel {
    const chart: ChartModel = { labels: [], data: [] };
    const labels = ['P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P>6'];
    chart.labels = labels;
    console.log(this.caseSummary.probabilities);
    chart.data = [...this.caseSummary.probabilities];
    return chart;
  }
}
