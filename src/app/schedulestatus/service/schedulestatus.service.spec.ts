import { TestBed, inject } from '@angular/core/testing';

import { SchedulestatusService } from './schedulestatus.service';

describe('SchedulestatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulestatusService]
    });
  });

  it('should be created', inject([SchedulestatusService], (service: SchedulestatusService) => {
    expect(service).toBeTruthy();
  }));
});
