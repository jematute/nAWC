import { TestBed, inject } from '@angular/core/testing';

import { AdeptApiService } from './adept-api.service';

describe('AdeptApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdeptApiService]
    });
  });

  it('should be created', inject([AdeptApiService], (service: AdeptApiService) => {
    expect(service).toBeTruthy();
  }));
});
