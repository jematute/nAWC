import { LibraryBrowserModule } from './library-browser.module';

describe('LibraryBrowserModule', () => {
  let libraryBrowserModule: LibraryBrowserModule;

  beforeEach(() => {
    libraryBrowserModule = new LibraryBrowserModule();
  });

  it('should create an instance', () => {
    expect(libraryBrowserModule).toBeTruthy();
  });
});
