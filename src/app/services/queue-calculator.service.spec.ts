import { TestBed } from '@angular/core/testing';

import { QueueCalculatorService } from './queue-calculator.service';

describe('QueueCalculatorService', () => {
  let service: QueueCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
