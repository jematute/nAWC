import { CommandsModule } from './commands.module';

describe('CommandsModule', () => {
  let commandsModule: CommandsModule;

  beforeEach(() => {
    commandsModule = new CommandsModule();
  });

  it('should create an instance', () => {
    expect(commandsModule).toBeTruthy();
  });
});
