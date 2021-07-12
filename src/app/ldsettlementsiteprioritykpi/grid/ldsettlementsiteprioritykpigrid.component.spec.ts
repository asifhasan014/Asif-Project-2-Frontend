import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsiteprioritykpigridComponent } from './ldsettlementsiteprioritykpigrid.component';

describe('LdsettlementsiteprioritykpigridComponent', () => {
  let component: LdsettlementsiteprioritykpigridComponent;
  let fixture: ComponentFixture<LdsettlementsiteprioritykpigridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsiteprioritykpigridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsiteprioritykpigridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
