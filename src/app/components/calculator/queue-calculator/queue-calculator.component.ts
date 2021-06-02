import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDataEntryProvider } from 'src/app/interfaces/dataEntryProvider.interface';
import { CalculatorOptions } from 'src/app/models/calculatorOptions.model';
import { QueueCalculatorService } from 'src/app/services/queue-calculator.service';

@Component({
  selector: 'app-queue-calculator',
  templateUrl: './queue-calculator.component.html',
  styleUrls: ['./queue-calculator.component.css'],
  // providers: [QueueCalculatorService]
})
export class QueueCalculatorComponent implements OnInit {
  public get currentLength(): number {
    return this.calculator.currentLength;
  }
  public get totalCustomers(): number {
    return this.calculator.totalCustomers;
  }
  public get timeRemaining(): number {
    return this.calculator.timeRemaining;
  }
  public get running(): boolean {
    return this.calculator.running;
  }
  public get byActualMu(): IDataEntryProvider {
    return this.calculator.usingActualMu;
  }
  public get byActualMeanLength(): IDataEntryProvider {
    return this.calculator.usingActualMeanLength;
  }

  constructor(
    public calculator: QueueCalculatorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public start(): void {
    this.calculator.start();
  }
  public stop(): void {
    this.calculator.stop();
  }
  public enqueue(): void {
    this.calculator.enqueue();
  }
  public dequeue(): void {
    this.calculator.dequeue();
  }

  public submit(data: IDataEntryProvider): void {
    this.router.navigate(['/summary/results/',
     { servers: data.getS(), arrivals: data.getLambda().toFixed(2), services: data.getMu().toFixed(2) }]);
  }

  public onGettingOptions(options: CalculatorOptions): void {
    this.calculator.setOptions(options);
    this.start();
  }
}
