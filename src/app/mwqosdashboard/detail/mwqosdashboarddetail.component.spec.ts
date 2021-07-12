import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqosdashboarddetailComponent } from './mwqosdashboarddetail.component';

describe('MwqosdashboarddetailComponent', () => {
  let component: MwqosdashboarddetailComponent;
  let fixture: ComponentFixture<MwqosdashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqosdashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqosdashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
