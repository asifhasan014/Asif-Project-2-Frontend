import { TestBed, inject } from '@angular/core/testing';

import { UtilisationericssonwanService } from './utilisationericssonwan.service';

describe('UtilisationericssonwanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilisationericssonwanService]
    });
  });

  it('should be created', inject([UtilisationericssonwanService], (service: UtilisationericssonwanService) => {
    expect(service).toBeTruthy();
  }));
});
