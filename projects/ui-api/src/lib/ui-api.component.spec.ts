import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiApiComponent } from './ui-api.component';

describe('UiApiComponent', () => {
  let component: UiApiComponent;
  let fixture: ComponentFixture<UiApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
