import { TestBed, inject } from '@angular/core/testing';

import { TicketassignedgroupService } from './ticketassignedgroup.service';

describe('TicketassignedgroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketassignedgroupService]
    });
  });

  it('should be created', inject([TicketassignedgroupService], (service: TicketassignedgroupService) => {
    expect(service).toBeTruthy();
  }));
});
