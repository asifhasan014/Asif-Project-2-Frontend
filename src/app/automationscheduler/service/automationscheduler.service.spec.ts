import { TestBed, inject } from '@angular/core/testing';

import { AutomationschedulerService } from './automationscheduler.service';

describe('AutomationschedulerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomationschedulerService]
    });
  });

  it('should be created', inject([AutomationschedulerService], (service: AutomationschedulerService) => {
    expect(service).toBeTruthy();
  }));
});
