import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingfilterComponent } from './ticketingfilter.component';

describe('TicketingfilterComponent', () => {
  let component: TicketingfilterComponent;
  let fixture: ComponentFixture<TicketingfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
