import { TestBed, inject } from '@angular/core/testing';

import { UniquelinktableforsltslService } from './uniquelinktableforsltsl.service';

describe('UniquelinktableforsltslService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniquelinktableforsltslService]
    });
  });

  it('should be created', inject([UniquelinktableforsltslService], (service: UniquelinktableforsltslService) => {
    expect(service).toBeTruthy();
  }));
});
