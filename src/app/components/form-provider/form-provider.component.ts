import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/customValidators/customerValidators.validator';
import { CaseSummary } from 'src/app/models/caseSummary.model';
import { FormInput } from 'src/app/models/formInput.model';
import { FormProviderService } from 'src/app/services/form-provider.service';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.css']
})
export class FormProviderComponent implements OnInit {
  public inputForm: FormGroup;
  public solved: boolean = false;
  public caseSummaries: CaseSummary[] = [];
  constructor(
    private _fb: FormBuilder,
    // private _formProviderService: FormProviderService,
    private _route: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      servers: [1, [Validators.required, Validators.min(1)]],
      arrivals: [1, [Validators.required, Validators.min(0)]],
      services: [1, [Validators.required, Validators.min(0)]]
    }, { validators: [CustomValidators.rhoMustBeLessThanServers] });

    this._route.paramMap.subscribe((params) => {
      const servers = +params.get('servers');
      const arrivals = +params.get('arrivals');
      const services = +params.get('services');
      this.patchFormValues(servers, arrivals, services);
    }, (err) => console.error(err));
  }
  private patchFormValues(servers: number, arrivals: number, services: number): void {
    if (servers || arrivals || services) {
      this.inputForm.patchValue(
        {
          servers,
          arrivals,
          services
        }
      );
    }
  }

  public onSubmit(): void {
    const input = this.mapFormValuesToModel();
    this._router.navigate(['/summary/results/',
      { servers: input.servers, arrivals: input.arrivals.toFixed(2), services: input.services.toFixed(2) }]);
  }

  private mapFormValuesToModel(): FormInput {
    const input = new FormInput();
    input.servers = this.inputForm.value.servers;
    input.arrivals = this.inputForm.value.arrivals;
    input.services = this.inputForm.value.services;
    console.log(input);
    return input;
  }
}


