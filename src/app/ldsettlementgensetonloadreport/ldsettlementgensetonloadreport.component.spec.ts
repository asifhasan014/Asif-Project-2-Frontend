import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementgensetonloadreportComponent } from './ldsettlementgensetonloadreport.component';

describe('LdsettlementgensetonloadreportComponent', () => {
  let component: LdsettlementgensetonloadreportComponent;
  let fixture: ComponentFixture<LdsettlementgensetonloadreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementgensetonloadreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementgensetonloadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
