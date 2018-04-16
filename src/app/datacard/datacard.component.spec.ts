import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacardComponent } from './datacard.component';

describe('DatacardComponent', () => {
  let component: DatacardComponent;
  let fixture: ComponentFixture<DatacardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
