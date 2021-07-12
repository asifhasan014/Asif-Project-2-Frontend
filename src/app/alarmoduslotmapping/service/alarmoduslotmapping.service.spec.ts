import { TestBed, inject } from '@angular/core/testing';

import { AlarmoduslotmappingService } from './alarmoduslotmapping.service';

describe('AlarmoduslotmappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmoduslotmappingService]
    });
  });

  it('should be created', inject([AlarmoduslotmappingService], (service: AlarmoduslotmappingService) => {
    expect(service).toBeTruthy();
  }));
});
