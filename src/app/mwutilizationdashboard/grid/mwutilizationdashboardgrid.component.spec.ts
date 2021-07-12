import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwutilizationdashboardgridComponent } from './mwutilizationdashboardgrid.component';

describe('MwutilizationdashboardgridComponent', () => {
  let component: MwutilizationdashboardgridComponent;
  let fixture: ComponentFixture<MwutilizationdashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwutilizationdashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwutilizationdashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
