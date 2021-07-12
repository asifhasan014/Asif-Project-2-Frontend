import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwalarmdashboarddetailComponent } from './mwalarmdashboarddetail.component';

describe('MwalarmdashboarddetailComponent', () => {
  let component: MwalarmdashboarddetailComponent;
  let fixture: ComponentFixture<MwalarmdashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwalarmdashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwalarmdashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
