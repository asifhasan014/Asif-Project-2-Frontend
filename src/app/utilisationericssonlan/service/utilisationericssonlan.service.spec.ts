import { TestBed, inject } from '@angular/core/testing';

import { UtilisationericssonlanService } from './utilisationericssonlan.service';

describe('UtilisationericssonlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilisationericssonlanService]
    });
  });

  it('should be created', inject([UtilisationericssonlanService], (service: UtilisationericssonlanService) => {
    expect(service).toBeTruthy();
  }));
});
