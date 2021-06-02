// import { error } from '@angular/compiler/src/util';
import { Injectable, OnDestroy } from '@angular/core';
import { IDataEntryProvider } from '../interfaces/dataEntryProvider.interface';
import { QueueStatus } from '../interfaces/queueStatus.interface';
import { CalculatorOptions } from '../models/calculatorOptions.model';

@Injectable({
  providedIn: 'root'
})
export class QueueCalculatorService implements OnDestroy {
  private stopTimeOut: NodeJS.Timeout;
  private refreshTimeOut: NodeJS.Timeout;
  private started: boolean = false;
  private stopped: boolean = false;

  public startingLength: number = 0;
  public currentLength: number = 0;
  public totalCustomers: number = 0;
  public totalServedTime: number = 0;
  public totalServedCustomers: number = 0;
  public timeUnit: number = 1000;
  public get running(): boolean {
    return this.started && !this.stopped;
  }

  public totalduration: number = 60000;
  public firstTick: Date;
  public previousTick: Date;
  public status: QueueStatus[] = [];
  public timeRemaining: number;
  public usingActualMu: IDataEntryProvider;
  public usingActualMeanLength: IDataEntryProvider;
  constructor() { }

  ngOnDestroy(): void {
    clearInterval(this.stopTimeOut);
    clearInterval(this.refreshTimeOut);
  }


  public start(): void {
    this.started = true;
    this.stopped = false;
    this.currentLength = this.startingLength;
    this.firstTick = new Date();
    this.previousTick = this.firstTick;
    this.timeRemaining = this.totalduration / this.timeUnit;
    this.updateTimeEachSecond();
    this.stopAfterTotalDuration();
  }

  public stop(): void {
    clearInterval(this.stopTimeOut);
    clearInterval(this.refreshTimeOut);
    const lengthChange = 0;
    this.submitState(lengthChange);

    this.stopped = true;
    this.started = false;

    const lambda = this.calculateLambda();
    const actualMu = this.calculateActualMu();
    const meanLength = this.calculateMeanLength(lambda, actualMu);
    this.usingActualMu = {
      getLambda: (): number => lambda,
      getMu: (): number => actualMu,
      getS: (): number => 1,
      getL: (): number => meanLength
    };

    const actualMeanLength = this.calculateActualMeanLength();
    const mu = this.calculateMu(lambda, actualMeanLength);
    this.usingActualMeanLength = {
      getLambda: (): number => lambda,
      getMu: (): number => mu,
      getS: (): number => 1,
      getL: (): number => actualMeanLength
    };

  }

  public enqueue(): void {
    if (!this.running) {
      throw new Error('calulator is not running atm.');
    }
    this.totalCustomers++;
    const lengthChange = 1;
    this.submitState(lengthChange);
  }

  public dequeue(): void {
    if (!this.running) {
      throw new Error('calulator is not running atm.');
    }
    this.totalServedCustomers++;
    const lengthChange = -1;
    this.submitState(lengthChange);
  }

  public setOptions(options: CalculatorOptions): void {
    if (this.running) {
      throw new Error('Calculator is running atm');
    }
    this.totalduration = options.duration;
    this.startingLength = options.startingLength;
  }

  private stopAfterTotalDuration(): void {
    this.stopTimeOut = setInterval(() => {
      this.stop();
    }, this.totalduration);
  }

  private updateTimeEachSecond(): void {
    this.refreshTimeOut = setInterval(() => {
      this.timeRemaining = (this.totalduration + this.firstTick.getTime() - new Date().getTime()) / 1000;
      if (this.timeRemaining <= 0) {
      }
    }, 1000);
  }
  private submitState(change: number): void {
    const now = new Date();
    const interval = now.getTime() - this.previousTick.getTime();
    this.status.push({ length: this.currentLength, interval });
    if (this.currentLength !== 0) {
      this.totalServedTime += interval;
    }
    this.currentLength += change;
    this.previousTick = now;
  }

  private getTotalDuration(): number {
    return (this.previousTick.getTime() - this.firstTick.getTime()) / this.timeUnit;
  }

  private calculateLambda(): number {
    return this.getTotalDuration ? this.totalCustomers / this.getTotalDuration() : 0;
  }
  private calculateActualMeanLength(): number {
    // result = interval1 * length1 + interval2 * length2 + interval3 * length 3 +....
    const sumIntervalAndLengthProduct = this.status.reduce((sum, cur) => {
      sum += cur.interval * cur.length;
      return sum;
    }, 0);

    const totalInterval: number = this.status.reduce((sum, cur) => {
      sum += cur.interval;
      return sum;
    }, 0);

    // This should return the average length over the total duration
    return sumIntervalAndLengthProduct / totalInterval;
  }

  private calculateActualMu(): number {
    return this.totalServedCustomers * this.timeUnit / this.totalServedTime;
  }

  private calculateMu(lambda: number, averageLength: number): number {
    return (1 + averageLength) * lambda / averageLength;
  }

  private calculateMeanLength(lambda: number, mu: number): number {
    if (mu <= lambda) {
      return Infinity;
    }
    return lambda / (mu - lambda);
  }
}
