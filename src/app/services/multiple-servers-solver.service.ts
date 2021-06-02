import { Injectable } from '@angular/core';
import { IDataEntryProvider } from '../interfaces/dataEntryProvider.interface';
import { CaseSummary } from '../models/caseSummary.model';

@Injectable({
  providedIn: 'root'
})
export class MultipleServersSolverService {
  private lambda: number;
  private mu: number;
  private rho: number;
  private l: number;
  private lq: number;
  private w: number;
  private wq: number;
  private p0: number;
  private s: number;
  constructor() { }

  public solve(provider: IDataEntryProvider): CaseSummary | never {
    let caseSummary: CaseSummary;
    this.s = provider.getS();
    this.lambda = provider.getLambda();
    this.mu = provider.getMu();
    if (this.mu * this.s < this.lambda) {
      throw new Error('mu * s should be bigger than lambda');
    }
    this.rho = this.getUtilizationFactor();
    this.p0 = this.getP0();
    this.lq = this.getLq();
    this.l = this.getL();
    this.wq = this.getWq();
    this.w = this.getW();
    caseSummary = new CaseSummary();
    caseSummary.numberOfServers = this.s;
    caseSummary.meanArrivalRate = this.lambda;
    caseSummary.meanServiceRate = this.mu;
    caseSummary.utilizationFactor = this.rho;
    caseSummary.probabilityOf0Customers = this.p0;
    caseSummary.queueLength = this.lq;
    caseSummary.systemLength = this.l;
    caseSummary.queueWaitingTime = this.wq;
    caseSummary.systemWaitingTime = this.w;
    caseSummary.probabilities = this.getProbabiltiesArray();

    return caseSummary;
  }

  public getUtilizationFactor(): number {
    // TODO fix UtilizationFactor to use number of servers
    return this.lambda / (this.mu);
  }

  public getP0(): number {
    const extra1 = 1 - this.rho / this.s;
    const extra2 = this.getExtra2();
    const resultInverse = Math.pow(this.rho, this.s) / (this.getFactorial(this.s) * extra1) + extra2;
    return 1 / resultInverse;
  }
  public getLq(): number {
    const extra = Math.pow(1 - this.rho / this.s, 2);
    console.log(extra);
    const lq = Math.pow(this.rho, this.s + 1) * this.p0 / (this.s * this.getFactorial(this.s) * extra);
    console.log(lq);
    return lq;
  }

  public getL(): number {
    return this.lq + this.rho;
  }

  public getWq(): number {
    return this.lq / this.lambda;
  }

  public getW(): number {
    return this.wq + 1 / this.mu;
  }



  private getFactorial(num: number): number {
    let res: number = 1;
    for (let i = num; i >= 1; i--) {
      res *= i;
    }
    return res;
  }

  private getPn(n: number): number {
    let result: number;
    if (n <= this.s) {
      result = Math.pow(this.rho, n) * this.p0 / this.getFactorial(n);
    } else {
      result = Math.pow(this.rho, n) * this.p0 / (this.getFactorial(this.s) * Math.pow(this.s, n - this.s));
    }
    return result;
  }
  private getExtra2(): number {
    let sum = 0;
    for (let i = 0; i <= this.s - 1; i++) {
      sum += Math.pow(this.rho, i) / this.getFactorial(i);
      console.log(` i ${i} ${sum}`);
    }
    return sum;
  }

  private getProbabiltiesArray(): number[] {
    const results: number[] = [];
    results.push(this.p0);
    for (let i = 1; i < 6; i++) {
      results.push(this.getPn(i));
    }
    return results;
  }

}
