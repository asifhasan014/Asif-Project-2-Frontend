import { TestBed, inject } from '@angular/core/testing';

import { TicketingfilterService } from './ticketingfilter.service';

describe('TicketingfilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketingfilterService]
    });
  });

  it('should be created', inject([TicketingfilterService], (service: TicketingfilterService) => {
    expect(service).toBeTruthy();
  }));
});
