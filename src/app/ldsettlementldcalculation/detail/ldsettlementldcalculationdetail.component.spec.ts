import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementldcalculationdetailComponent } from './ldsettlementldcalculationdetail.component';

describe('LdsettlementldcalculationdetailComponent', () => {
  let component: LdsettlementldcalculationdetailComponent;
  let fixture: ComponentFixture<LdsettlementldcalculationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementldcalculationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementldcalculationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
