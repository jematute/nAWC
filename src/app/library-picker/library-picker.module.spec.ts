import { LibraryPickerModule } from './library-picker.module';

describe('LibraryPickerModule', () => {
  let libraryPickerModule: LibraryPickerModule;

  beforeEach(() => {
    libraryPickerModule = new LibraryPickerModule();
  });

  it('should create an instance', () => {
    expect(libraryPickerModule).toBeTruthy();
  });
});
