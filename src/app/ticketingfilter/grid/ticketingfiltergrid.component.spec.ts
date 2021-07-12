import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingfiltergridComponent } from './ticketingfiltergrid.component';

describe('TicketingfiltergridComponent', () => {
  let component: TicketingfiltergridComponent;
  let fixture: ComponentFixture<TicketingfiltergridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketingfiltergridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketingfiltergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
