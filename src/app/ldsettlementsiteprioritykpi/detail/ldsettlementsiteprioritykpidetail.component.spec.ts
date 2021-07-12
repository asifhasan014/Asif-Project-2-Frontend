import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsiteprioritykpidetailComponent } from './ldsettlementsiteprioritykpidetail.component';

describe('LdsettlementsiteprioritykpidetailComponent', () => {
  let component: LdsettlementsiteprioritykpidetailComponent;
  let fixture: ComponentFixture<LdsettlementsiteprioritykpidetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsiteprioritykpidetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsiteprioritykpidetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
