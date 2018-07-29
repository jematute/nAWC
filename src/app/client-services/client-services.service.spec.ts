import { TestBed, inject } from '@angular/core/testing';

import { ClientServicesService } from './client-services.service';

describe('ClientServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientServicesService]
    });
  });

  it('should be created', inject([ClientServicesService], (service: ClientServicesService) => {
    expect(service).toBeTruthy();
  }));
});
