import { PluginsModule } from './plugins.module';

describe('PluginsModule', () => {
  let pluginsModule: PluginsModule;

  beforeEach(() => {
    pluginsModule = new PluginsModule();
  });

  it('should create an instance', () => {
    expect(pluginsModule).toBeTruthy();
  });
});
