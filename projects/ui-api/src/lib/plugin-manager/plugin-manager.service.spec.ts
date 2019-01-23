import { TestBed } from '@angular/core/testing';

import { PluginManagerService } from './plugin-manager.service';

describe('PluginManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PluginManagerService = TestBed.get(PluginManagerService);
    expect(service).toBeTruthy();
  });
});
