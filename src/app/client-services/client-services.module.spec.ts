import { ClientServicesModule } from './client-services.module';

describe('ClientServicesModule', () => {
  let clientServicesModule: ClientServicesModule;

  beforeEach(() => {
    clientServicesModule = new ClientServicesModule();
  });

  it('should create an instance', () => {
    expect(clientServicesModule).toBeTruthy();
  });
});
