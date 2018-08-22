import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBrowserComponent } from './library-browser.component';

describe('LibraryBrowserComponent', () => {
  let component: LibraryBrowserComponent;
  let fixture: ComponentFixture<LibraryBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
