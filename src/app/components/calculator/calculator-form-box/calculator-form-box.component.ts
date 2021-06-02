import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalculatorOptions as CalculatorOptions } from 'src/app/models/calculatorOptions.model';

import { TimeUnit } from 'src/app/models/timeUnit.enum';

@Component({
  selector: 'app-calculator-form-box',
  templateUrl: './calculator-form-box.component.html',
  styleUrls: ['./calculator-form-box.component.css']
})
export class CalculatorFormBoxComponent implements OnInit {
  @Output()
  formSubmit = new EventEmitter<CalculatorOptions>();

  public form: FormGroup;
  public options: CalculatorOptions;
  public get second(): number {
    return TimeUnit.second;
  }
  public get minute(): number {
    return TimeUnit.minute;
  }
  public get hour(): number {
    return TimeUnit.hour;
  }

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group(
      {
        startingLength: [0],
        duration: [60],
        durationUnit: [TimeUnit.second]
      }
    );
  }

  public onSubmit(): void {
    this.mapFormToModel();
    this.formSubmit.emit(this.options);
  }
  private mapFormToModel(): void {
    this.options = new CalculatorOptions();
    this.options.startingLength = this.form.value.startingLength;
    this.options.duration = this.form.value.duration * this.form.value.durationUnit;
  }

}
