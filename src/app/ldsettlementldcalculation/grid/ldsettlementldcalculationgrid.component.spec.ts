import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementldcalculationgridComponent } from './ldsettlementldcalculationgrid.component';

describe('LdsettlementldcalculationgridComponent', () => {
  let component: LdsettlementldcalculationgridComponent;
  let fixture: ComponentFixture<LdsettlementldcalculationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementldcalculationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementldcalculationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
