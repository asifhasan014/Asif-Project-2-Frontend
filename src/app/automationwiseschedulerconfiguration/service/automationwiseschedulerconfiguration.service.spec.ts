import { TestBed, inject } from '@angular/core/testing';

import { AutomationwiseschedulerconfigurationService } from './automationwiseschedulerconfiguration.service';

describe('AutomationwiseschedulerconfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomationwiseschedulerconfigurationService]
    });
  });

  it('should be created', inject([AutomationwiseschedulerconfigurationService], (service: AutomationwiseschedulerconfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
