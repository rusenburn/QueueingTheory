import { TestBed } from '@angular/core/testing';

import { MultipleServersSolverService } from './multiple-servers-solver.service';

describe('MultipleServersSolverService', () => {
  let service: MultipleServersSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleServersSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
