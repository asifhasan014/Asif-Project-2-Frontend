import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementdclowdetailComponent } from './ldsettlementdclowdetail.component';

describe('LdsettlementdclowdetailComponent', () => {
  let component: LdsettlementdclowdetailComponent;
  let fixture: ComponentFixture<LdsettlementdclowdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementdclowdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementdclowdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
