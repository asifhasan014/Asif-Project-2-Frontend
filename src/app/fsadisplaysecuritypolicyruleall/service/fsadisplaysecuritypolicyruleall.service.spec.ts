import { TestBed, inject } from '@angular/core/testing';

import { FsadisplaysecuritypolicyruleallService } from './fsadisplaysecuritypolicyruleall.service';

describe('FsadisplaysecuritypolicyruleallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsadisplaysecuritypolicyruleallService]
    });
  });

  it('should be created', inject([FsadisplaysecuritypolicyruleallService], (service: FsadisplaysecuritypolicyruleallService) => {
    expect(service).toBeTruthy();
  }));
});
