import { TestBed, inject } from '@angular/core/testing';

import { HttpbaseService } from './httpbase.service';

describe('HttpbaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpbaseService]
    });
  });

  it('should be created', inject([HttpbaseService], (service: HttpbaseService) => {
    expect(service).toBeTruthy();
  }));
});
