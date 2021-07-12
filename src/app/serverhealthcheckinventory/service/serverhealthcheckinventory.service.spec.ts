import { TestBed, inject } from '@angular/core/testing';

import { ServerhealthcheckinventoryService } from './serverhealthcheckinventory.service';

describe('ServerhealthcheckinventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerhealthcheckinventoryService]
    });
  });

  it('should be created', inject([ServerhealthcheckinventoryService], (service: ServerhealthcheckinventoryService) => {
    expect(service).toBeTruthy();
  }));
});
