import { TestBed, inject } from '@angular/core/testing';

import { ToolbarService } from './toolbar/toolbar.servicee';

describe('ToolbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolbarService]
    });
  });

  it('should be created', inject([ToolbarService], (service: ToolbarService) => {
    expect(service).toBeTruthy();
  }));
});
