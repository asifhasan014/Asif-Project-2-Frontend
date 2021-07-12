import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiqosdetailComponent } from './huaweiqosdetail.component';

describe('HuaweiqosdetailComponent', () => {
  let component: HuaweiqosdetailComponent;
  let fixture: ComponentFixture<HuaweiqosdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiqosdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiqosdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
