import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdeptApiComponent } from './adept-api.component';

describe('AdeptApiComponent', () => {
  let component: AdeptApiComponent;
  let fixture: ComponentFixture<AdeptApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdeptApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdeptApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
