import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketassignedgroupdetailComponent } from './ticketassignedgroupdetail.component';

describe('TicketassignedgroupdetailComponent', () => {
  let component: TicketassignedgroupdetailComponent;
  let fixture: ComponentFixture<TicketassignedgroupdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketassignedgroupdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketassignedgroupdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
