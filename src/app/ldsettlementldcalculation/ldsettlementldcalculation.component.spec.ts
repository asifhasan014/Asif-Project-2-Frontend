import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementldcalculationComponent } from './ldsettlementldcalculation.component';

describe('LdsettlementldcalculationComponent', () => {
  let component: LdsettlementldcalculationComponent;
  let fixture: ComponentFixture<LdsettlementldcalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementldcalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementldcalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
