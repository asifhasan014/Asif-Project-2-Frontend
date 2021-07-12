import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationdashboardconfigurationComponent } from './utilizationdashboardconfiguration.component';

describe('UtilizationdashboardconfigurationComponent', () => {
  let component: UtilizationdashboardconfigurationComponent;
  let fixture: ComponentFixture<UtilizationdashboardconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationdashboardconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationdashboardconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
