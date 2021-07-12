import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementgensetonloadreportgridComponent } from './ldsettlementgensetonloadreportgrid.component';

describe('LdsettlementgensetonloadreportgridComponent', () => {
  let component: LdsettlementgensetonloadreportgridComponent;
  let fixture: ComponentFixture<LdsettlementgensetonloadreportgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementgensetonloadreportgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementgensetonloadreportgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
