import { TestBed } from '@angular/core/testing';

import { UiApiService } from './ui-api.service';

describe('UiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiApiService = TestBed.get(UiApiService);
    expect(service).toBeTruthy();
  });
});
