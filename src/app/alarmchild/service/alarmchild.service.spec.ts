import { TestBed, inject } from '@angular/core/testing';

import { AlarmchildService } from './alarmchild.service';

describe('AlarmchildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmchildService]
    });
  });

  it('should be created', inject([AlarmchildService], (service: AlarmchildService) => {
    expect(service).toBeTruthy();
  }));
});
