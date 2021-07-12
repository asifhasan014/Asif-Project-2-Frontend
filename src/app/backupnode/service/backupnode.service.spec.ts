import { TestBed, inject } from '@angular/core/testing';

import { BackupnodeService } from './backupnode.service';

describe('BackupnodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackupnodeService]
    });
  });

  it('should be created', inject([BackupnodeService], (service: BackupnodeService) => {
    expect(service).toBeTruthy();
  }));
});
