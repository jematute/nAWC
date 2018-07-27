import { TestBed, inject } from '@angular/core/testing';

import { WorkareaService } from './workarea.service';

describe('WorkareaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkareaService]
    });
  });

  it('should be created', inject([WorkareaService], (service: WorkareaService) => {
    expect(service).toBeTruthy();
  }));
});
