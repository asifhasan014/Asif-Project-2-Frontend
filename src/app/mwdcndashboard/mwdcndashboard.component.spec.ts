import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwdcndashboardComponent } from './mwdcndashboard.component';

describe('MwdcndashboardComponent', () => {
  let component: MwdcndashboardComponent;
  let fixture: ComponentFixture<MwdcndashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwdcndashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwdcndashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
