import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiqosComponent } from './huaweiqos.component';

describe('HuaweiqosComponent', () => {
  let component: HuaweiqosComponent;
  let fixture: ComponentFixture<HuaweiqosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiqosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiqosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
