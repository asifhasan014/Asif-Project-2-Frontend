import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosradioqualityericssondetailComponent } from './qosradioqualityericssondetail.component';

describe('QosradioqualityericssondetailComponent', () => {
  let component: QosradioqualityericssondetailComponent;
  let fixture: ComponentFixture<QosradioqualityericssondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosradioqualityericssondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosradioqualityericssondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
