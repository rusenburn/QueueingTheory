import { Injectable } from '@angular/core';
import { IDataEntryProvider } from '../interfaces/dataEntryProvider.interface';
import { ISolver } from '../interfaces/solver.interface';
import { CaseSummary } from '../models/caseSummary.model';

@Injectable({
  providedIn: 'root'
})
export class SolverService implements ISolver {
  private lambda: number;
  private mu: number;
  private rho: number;
  private l: number;
  private lq: number;
  private w: number;
  private wq: number;
  private p0: number;
  constructor() { }

  public solve(provider: IDataEntryProvider): CaseSummary {
    let caseSummary: CaseSummary;
    this.lambda = provider.getLambda();
    this.mu = provider.getMu();
    if (this.lambda > this.mu) {
      this.l = provider.getL();
      this.mu = this.getMuFromL();
    } else {
      this.l = this.getL();
    }
    this.rho = this.getUtilizationFactor();
    this.lq = this.getLq();
    this.w = this.getW();
    this.wq = this.getWq();
    this.p0 = this.getP0();
    caseSummary = new CaseSummary();
    caseSummary = this.mapToCaseSummary(caseSummary);
    caseSummary.probabilities = this.getProbalitiesArray();
    return caseSummary;
  }

  public getUtilizationFactor(): number {
    return this.lambda / this.mu;
  }

  public getMuFromL(): number {
    return (1 + this.l) * this.lambda / this.l;
  }

  public getL(): number {
    const l: number = this.lambda / (this.mu - this.lambda);
    return l;
  }

  public getLq(): number {
    const lq = Math.pow(this.lambda, 2) / (this.mu * (this.mu - this.lambda));
    return lq;
  }

  public getW(): number {
    return 1 / (this.mu - this.lambda);
  }
  public getWq(): number {
    return (this.lambda / (this.mu * (this.mu - this.lambda)));
  }

  public getP0(): number {
    return 1 - this.rho;
  }

  public getPn(n: number): number {
    return this.p0 * Math.pow(this.rho, n);
  }

  private mapToCaseSummary(caseSummary: CaseSummary): CaseSummary {
    caseSummary.numberOfServers = 1;
    caseSummary.meanArrivalRate = this.lambda;
    caseSummary.meanServiceRate = this.mu;
    caseSummary.systemLength = this.l;
    caseSummary.utilizationFactor = this.rho;
    caseSummary.queueLength = this.lq;
    caseSummary.systemWaitingTime = this.w;
    caseSummary.queueWaitingTime = this.wq;
    caseSummary.probabilityOf0Customers = this.p0;
    return caseSummary;
  }

  private getProbalitiesArray(): number[] {
    const probabilities: number[] = [];
    probabilities.push(this.p0);
    let others = 1 - this.p0;

    for (let i = 1; i < 6; i++) {
      const currentProbability = this.getPn(i);
      others -= currentProbability;
      console.log(others);
      probabilities.push(currentProbability);
    }
    probabilities.push(others);
    return probabilities;
  }
}
