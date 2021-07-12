import { TestBed, inject } from '@angular/core/testing';

import { Performancedatau2000ipService } from './performancedatau2000ip.service';

describe('Performancedatau2000ipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Performancedatau2000ipService]
    });
  });

  it('should be created', inject([Performancedatau2000ipService], (service: Performancedatau2000ipService) => {
    expect(service).toBeTruthy();
  }));
});
