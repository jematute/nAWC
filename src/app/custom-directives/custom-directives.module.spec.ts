import { CustomDirectivesModule } from './custom-directives.module';

describe('CustomDirectivesModule', () => {
  let customDirectivesModule: CustomDirectivesModule;

  beforeEach(() => {
    customDirectivesModule = new CustomDirectivesModule();
  });

  it('should create an instance', () => {
    expect(customDirectivesModule).toBeTruthy();
  });
});
