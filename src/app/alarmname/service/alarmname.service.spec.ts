import { TestBed, inject } from '@angular/core/testing';

import { AlarmnameService } from './alarmname.service';

describe('AlarmnameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmnameService]
    });
  });

  it('should be created', inject([AlarmnameService], (service: AlarmnameService) => {
    expect(service).toBeTruthy();
  }));
});
