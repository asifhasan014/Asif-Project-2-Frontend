import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsiteprioritykpiComponent } from './ldsettlementsiteprioritykpi.component';

describe('LdsettlementsiteprioritykpiComponent', () => {
  let component: LdsettlementsiteprioritykpiComponent;
  let fixture: ComponentFixture<LdsettlementsiteprioritykpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsiteprioritykpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsiteprioritykpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
