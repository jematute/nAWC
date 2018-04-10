import { TestBed, inject } from '@angular/core/testing';

import { GridServiceService } from './grid-service.service';

describe('GridServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridServiceService]
    });
  });

  it('should be created', inject([GridServiceService], (service: GridServiceService) => {
    expect(service).toBeTruthy();
  }));
});
