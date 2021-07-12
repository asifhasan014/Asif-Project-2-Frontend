import { TestBed, inject } from '@angular/core/testing';

import { FsadisplayfirewallsessionService } from './fsadisplayfirewallsession.service';

describe('FsadisplayfirewallsessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FsadisplayfirewallsessionService]
    });
  });

  it('should be created', inject([FsadisplayfirewallsessionService], (service: FsadisplayfirewallsessionService) => {
    expect(service).toBeTruthy();
  }));
});
