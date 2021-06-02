import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseSummary } from 'src/app/models/caseSummary.model';
import { FormInput } from 'src/app/models/formInput.model';
import { FormProviderService } from 'src/app/services/form-provider.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  public caseSummary: CaseSummary;
  public ready: boolean = false;
  public input: FormInput = new FormInput();
  constructor(
    private _route: ActivatedRoute,
    private _formProviderService: FormProviderService
  ) { }
  ngOnInit(): void {
    this._route.paramMap.subscribe(
      {
        next: (params) => {
          console.log(params);
          console.log(params.has('arrivals'));
          this.input.arrivals = +params.get('arrivals');
          this.input.services = +params.get('services');
          this.input.servers = +params.get('servers');
          this._formProviderService.setInputValue(this.input);
          this.caseSummary = this._formProviderService.solve();
          console.log(this.caseSummary);
          this.ready = true;
        },
        error: (err) => {
          console.error(err);
          this.ready = true;
        },
        complete: () => this.ready = true
      }
    );
  }

  public get lqPercentage(): number {
    return Math.round(this.caseSummary.queueLength * 100 / this.caseSummary.systemLength);
  }

  public get wqPercentage(): number {
    return Math.round(this.caseSummary.queueWaitingTime * 100 / this.caseSummary.systemWaitingTime);
  }

  public get p0(): number {
    return this.caseSummary.probabilityOf0Customers * 100;
  }

}
