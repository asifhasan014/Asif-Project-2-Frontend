import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementincidentgridComponent } from './ldsettlementincidentgrid.component';

describe('LdsettlementincidentgridComponent', () => {
  let component: LdsettlementincidentgridComponent;
  let fixture: ComponentFixture<LdsettlementincidentgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementincidentgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementincidentgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
