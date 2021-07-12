import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqosdashboardComponent } from './mwqosdashboard.component';

describe('MwqosdashboardComponent', () => {
  let component: MwqosdashboardComponent;
  let fixture: ComponentFixture<MwqosdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqosdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqosdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
