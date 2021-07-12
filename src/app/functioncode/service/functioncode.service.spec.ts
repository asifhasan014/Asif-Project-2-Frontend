import { TestBed, inject } from '@angular/core/testing';

import { FunctioncodeService } from './functioncode.service';

describe('FunctioncodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctioncodeService]
    });
  });

  it('should be created', inject([FunctioncodeService], (service: FunctioncodeService) => {
    expect(service).toBeTruthy();
  }));
});
