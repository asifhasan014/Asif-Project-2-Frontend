import { TestBed } from '@angular/core/testing';

import { LdsettlementdashboardService } from './ldsettlementdashboard.service';

describe('LdsettlementdashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LdsettlementdashboardService = TestBed.get(LdsettlementdashboardService);
    expect(service).toBeTruthy();
  });
});
