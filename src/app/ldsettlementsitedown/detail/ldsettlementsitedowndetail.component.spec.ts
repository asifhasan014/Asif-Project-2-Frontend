import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsitedowndetailComponent } from './ldsettlementsitedowndetail.component';

describe('LdsettlementsitedowndetailComponent', () => {
  let component: LdsettlementsitedowndetailComponent;
  let fixture: ComponentFixture<LdsettlementsitedowndetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsitedowndetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsitedowndetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
