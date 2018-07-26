import { TestBed, inject } from '@angular/core/testing';

import { FTSSearchService } from './ftssearch.service';

describe('FTSSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FTSSearchService]
    });
  });

  it('should be created', inject([FTSSearchService], (service: FTSSearchService) => {
    expect(service).toBeTruthy();
  }));
});
