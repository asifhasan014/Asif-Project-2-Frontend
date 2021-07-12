import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketassignedgroupgridComponent } from './ticketassignedgroupgrid.component';

describe('TicketassignedgroupgridComponent', () => {
  let component: TicketassignedgroupgridComponent;
  let fixture: ComponentFixture<TicketassignedgroupgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketassignedgroupgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketassignedgroupgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
