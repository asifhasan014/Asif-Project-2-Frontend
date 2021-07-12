import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementpggridComponent } from './ldsettlementpggrid.component';

describe('LdsettlementpggridComponent', () => {
  let component: LdsettlementpggridComponent;
  let fixture: ComponentFixture<LdsettlementpggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementpggridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementpggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
