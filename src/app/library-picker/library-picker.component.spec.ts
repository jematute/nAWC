import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPickerComponent } from './library-picker.component';

describe('LibraryPickerComponent', () => {
  let component: LibraryPickerComponent;
  let fixture: ComponentFixture<LibraryPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
