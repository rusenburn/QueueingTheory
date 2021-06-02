import { Injectable } from '@angular/core';
import { IDataEntryProvider } from '../interfaces/dataEntryProvider.interface';
import { CaseSummary } from '../models/caseSummary.model';
import { FormInput } from '../models/formInput.model';
import { MultipleServersSolverService } from './multiple-servers-solver.service';
import { SolverService } from './solver.service';

@Injectable({
  providedIn: 'root'
})
export class FormProviderService implements IDataEntryProvider {
  private formInput: FormInput;
  constructor(
    private _singleServerSolver: SolverService,
    private _multiServerSolver: MultipleServersSolverService
  ) { }
  public getLambda(): number {
    return this.formInput.arrivals;
  }
  public getMu(): number {
    return this.formInput.services;
  }
  public getL(): number {
    throw new Error('Method not implemented.');
  }
  public getS(): number {
    return this.formInput.servers;
  }

  public setInputValue(formInput: FormInput): void {
    this.formInput = formInput;
  }

  public solve(): CaseSummary {
    let caseSummary: CaseSummary;
    if (this.formInput.servers > 1) {
      caseSummary = this._multiServerSolver.solve(this);
    } else {
      caseSummary = this._singleServerSolver.solve(this);
    }
    return caseSummary;
  }
}
