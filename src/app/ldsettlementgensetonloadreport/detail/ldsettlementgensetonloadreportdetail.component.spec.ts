import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementgensetonloadreportdetailComponent } from './ldsettlementgensetonloadreportdetail.component';

describe('LdsettlementgensetonloadreportdetailComponent', () => {
  let component: LdsettlementgensetonloadreportdetailComponent;
  let fixture: ComponentFixture<LdsettlementgensetonloadreportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementgensetonloadreportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementgensetonloadreportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
