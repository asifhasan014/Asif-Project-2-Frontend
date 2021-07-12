import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementdclowgridComponent } from './ldsettlementdclowgrid.component';

describe('LdsettlementdclowgridComponent', () => {
  let component: LdsettlementdclowgridComponent;
  let fixture: ComponentFixture<LdsettlementdclowgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementdclowgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementdclowgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
