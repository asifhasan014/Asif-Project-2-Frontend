import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsiteavailabilitygridComponent } from './ldsettlementsiteavailabilitygrid.component';

describe('LdsettlementsiteavailabilitygridComponent', () => {
  let component: LdsettlementsiteavailabilitygridComponent;
  let fixture: ComponentFixture<LdsettlementsiteavailabilitygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsiteavailabilitygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsiteavailabilitygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
