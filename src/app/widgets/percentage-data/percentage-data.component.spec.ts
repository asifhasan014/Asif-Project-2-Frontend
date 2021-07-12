import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageDataComponent } from './percentage-data.component';

describe('PercentageDataComponent', () => {
  let component: PercentageDataComponent;
  let fixture: ComponentFixture<PercentageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
