import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerhealthreportdetailComponent } from './serverhealthreportdetail.component';

describe('ServerhealthreportdetailComponent', () => {
  let component: ServerhealthreportdetailComponent;
  let fixture: ComponentFixture<ServerhealthreportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerhealthreportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerhealthreportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
