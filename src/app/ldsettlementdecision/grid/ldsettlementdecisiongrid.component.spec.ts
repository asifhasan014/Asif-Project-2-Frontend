import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementdecisiongridComponent } from './ldsettlementdecisiongrid.component';

describe('LdsettlementdecisiongridComponent', () => {
  let component: LdsettlementdecisiongridComponent;
  let fixture: ComponentFixture<LdsettlementdecisiongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementdecisiongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementdecisiongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
