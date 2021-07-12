import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinsightavailabiltygridComponent } from './customerinsightavailabiltygrid.component';

describe('CustomerinsightavailabiltygridComponent', () => {
  let component: CustomerinsightavailabiltygridComponent;
  let fixture: ComponentFixture<CustomerinsightavailabiltygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerinsightavailabiltygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerinsightavailabiltygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
