import { TestBed, inject } from '@angular/core/testing';

import { AutomationitemService } from './automationitem.service';

describe('AutomationitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomationitemService]
    });
  });

  it('should be created', inject([AutomationitemService], (service: AutomationitemService) => {
    expect(service).toBeTruthy();
  }));
});
