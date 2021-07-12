import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingfilterdetailComponent } from './ticketingfilterdetail.component';

describe('TicketingfilterdetailComponent', () => {
  let component: TicketingfilterdetailComponent;
  let fixture: ComponentFixture<TicketingfilterdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingfilterdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingfilterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
