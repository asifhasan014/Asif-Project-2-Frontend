import { TestBed, inject } from '@angular/core/testing';

import { ConfigurablecategoryService } from './configurablecategory.service';

describe('ConfigurablecategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurablecategoryService]
    });
  });

  it('should be created', inject([ConfigurablecategoryService], (service: ConfigurablecategoryService) => {
    expect(service).toBeTruthy();
  }));
});
