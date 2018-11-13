import { TestBed, inject } from '@angular/core/testing';

import { ExtractionService } from './extraction.service';

describe('ExtractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtractionService]
    });
  });

  it('should be created', inject([ExtractionService], (service: ExtractionService) => {
    expect(service).toBeTruthy();
  }));
});
