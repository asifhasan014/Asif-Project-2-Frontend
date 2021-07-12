import { TestBed, inject } from '@angular/core/testing';

import { MicrowavelinkreportService } from './microwavelinkreport.service';

describe('MicrowavelinkreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicrowavelinkreportService]
    });
  });

  it('should be created', inject([MicrowavelinkreportService], (service: MicrowavelinkreportService) => {
    expect(service).toBeTruthy();
  }));
});
