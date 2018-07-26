import { WorkareaModule } from './workarea.module';

describe('WorkareaModule', () => {
  let workareaModule: WorkareaModule;

  beforeEach(() => {
    workareaModule = new WorkareaModule();
  });

  it('should create an instance', () => {
    expect(workareaModule).toBeTruthy();
  });
});
