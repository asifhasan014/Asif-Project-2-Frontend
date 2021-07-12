import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinsightavailabiltydetailComponent } from './customerinsightavailabiltydetail.component';

describe('CustomerinsightavailabiltydetailComponent', () => {
  let component: CustomerinsightavailabiltydetailComponent;
  let fixture: ComponentFixture<CustomerinsightavailabiltydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerinsightavailabiltydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerinsightavailabiltydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
