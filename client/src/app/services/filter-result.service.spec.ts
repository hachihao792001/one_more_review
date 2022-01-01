import { TestBed } from '@angular/core/testing';

import { FilterResultService } from './filter-result.service';

describe('FilterResultService', () => {
  let service: FilterResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
