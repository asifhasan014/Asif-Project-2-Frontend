import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsitedowngridComponent } from './ldsettlementsitedowngrid.component';

describe('LdsettlementsitedowngridComponent', () => {
  let component: LdsettlementsitedowngridComponent;
  let fixture: ComponentFixture<LdsettlementsitedowngridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsitedowngridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsitedowngridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
