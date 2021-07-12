import { TestBed, inject } from '@angular/core/testing';

import { BackuphistoryService } from './backuphistory.service';

describe('BackuphistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackuphistoryService]
    });
  });

  it('should be created', inject([BackuphistoryService], (service: BackuphistoryService) => {
    expect(service).toBeTruthy();
  }));
});
