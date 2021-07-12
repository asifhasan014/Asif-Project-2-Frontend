import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiqosgridComponent } from './huaweiqosgrid.component';

describe('HuaweiqosgridComponent', () => {
  let component: HuaweiqosgridComponent;
  let fixture: ComponentFixture<HuaweiqosgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiqosgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiqosgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
