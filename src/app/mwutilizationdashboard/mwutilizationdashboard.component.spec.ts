import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwutilizationdashboardComponent } from './mwutilizationdashboard.component';

describe('MwutilizationdashboardComponent', () => {
  let component: MwutilizationdashboardComponent;
  let fixture: ComponentFixture<MwutilizationdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwutilizationdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwutilizationdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
