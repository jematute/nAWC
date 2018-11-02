import { TestBed, inject } from '@angular/core/testing';

import { ErrorDialogService } from './error-dialog.service';

describe('ErrorDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorDialogService]
    });
  });

  it('should be created', inject([ErrorDialogService], (service: ErrorDialogService) => {
    expect(service).toBeTruthy();
  }));
});
