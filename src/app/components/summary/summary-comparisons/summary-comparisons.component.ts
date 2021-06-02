import { Component, Input, OnInit } from '@angular/core';
import { CaseSummary } from 'src/app/models/caseSummary.model';

@Component({
  selector: 'app-summary-comparisons',
  templateUrl: './summary-comparisons.component.html',
  styleUrls: ['./summary-comparisons.component.css']
})
export class SummaryComparisonsComponent implements OnInit {
  @Input()
  public caseSummaries: CaseSummary[];
  constructor() { }
  // TODO : Use it again .

  ngOnInit(): void {
  }

  public onDelete(index: number): void {
    this.caseSummaries.splice(index, 1);
  }
}
