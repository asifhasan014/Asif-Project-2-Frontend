import { TestBed, inject } from '@angular/core/testing';

import { UserSessionService } from './usersession.service';

describe('UserSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSessionService]
    });
  });

  it('should be created', inject([UserSessionService], (service: UserSessionService) => {
    expect(service).toBeTruthy();
  }));
});
