import { TestBed, inject } from '@angular/core/testing';

import { BackupcalendarService } from './backupcalendar.service';

describe('BackupcalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackupcalendarService]
    });
  });

  it('should be created', inject([BackupcalendarService], (service: BackupcalendarService) => {
    expect(service).toBeTruthy();
  }));
});
