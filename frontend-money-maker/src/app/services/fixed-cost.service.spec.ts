import { TestBed } from '@angular/core/testing';

import { FixedCostService } from './fixed-cost.service';

describe('FixedCostService', () => {
  let service: FixedCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
