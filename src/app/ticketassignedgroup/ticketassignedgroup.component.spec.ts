import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketassignedgroupComponent } from './ticketassignedgroup.component';

describe('TicketassignedgroupComponent', () => {
  let component: TicketassignedgroupComponent;
  let fixture: ComponentFixture<TicketassignedgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketassignedgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketassignedgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
