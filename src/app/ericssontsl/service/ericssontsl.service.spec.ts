import { TestBed, inject } from '@angular/core/testing';

import { EricssontslService } from './ericssontsl.service';

describe('EricssontslService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EricssontslService]
    });
  });

  it('should be created', inject([EricssontslService], (service: EricssontslService) => {
    expect(service).toBeTruthy();
  }));
});
