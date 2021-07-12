import { TestBed, inject } from '@angular/core/testing';

import { PendingunusedfirewallruleService } from './pendingunusedfirewallrule.service';

describe('PendingunusedfirewallruleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingunusedfirewallruleService]
    });
  });

  it('should be created', inject([PendingunusedfirewallruleService], (service: PendingunusedfirewallruleService) => {
    expect(service).toBeTruthy();
  }));
});
