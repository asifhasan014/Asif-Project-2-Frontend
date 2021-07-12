import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwrsltsldashboardComponent } from './mwrsltsldashboard.component';

describe('MwrsltsldashboardComponent', () => {
  let component: MwrsltsldashboardComponent;
  let fixture: ComponentFixture<MwrsltsldashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwrsltsldashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwrsltsldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
