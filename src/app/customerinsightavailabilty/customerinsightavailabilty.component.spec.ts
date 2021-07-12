import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinsightavailabiltyComponent } from './customerinsightavailabilty.component';

describe('CustomerinsightavailabiltyComponent', () => {
  let component: CustomerinsightavailabiltyComponent;
  let fixture: ComponentFixture<CustomerinsightavailabiltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerinsightavailabiltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerinsightavailabiltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
