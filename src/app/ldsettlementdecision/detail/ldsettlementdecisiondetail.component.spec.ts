import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementdecisiondetailComponent } from './ldsettlementdecisiondetail.component';

describe('LdsettlementdecisiondetailComponent', () => {
  let component: LdsettlementdecisiondetailComponent;
  let fixture: ComponentFixture<LdsettlementdecisiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementdecisiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementdecisiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
