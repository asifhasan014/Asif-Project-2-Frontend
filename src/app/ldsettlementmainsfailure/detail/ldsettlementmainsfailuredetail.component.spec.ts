import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementmainsfailuredetailComponent } from './ldsettlementmainsfailuredetail.component';

describe('LdsettlementmainsfailuredetailComponent', () => {
  let component: LdsettlementmainsfailuredetailComponent;
  let fixture: ComponentFixture<LdsettlementmainsfailuredetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementmainsfailuredetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementmainsfailuredetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
