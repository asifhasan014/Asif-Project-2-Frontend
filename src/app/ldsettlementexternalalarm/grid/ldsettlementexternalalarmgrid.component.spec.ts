import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementexternalalarmgridComponent } from './ldsettlementexternalalarmgrid.component';

describe('LdsettlementexternalalarmgridComponent', () => {
  let component: LdsettlementexternalalarmgridComponent;
  let fixture: ComponentFixture<LdsettlementexternalalarmgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementexternalalarmgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementexternalalarmgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
