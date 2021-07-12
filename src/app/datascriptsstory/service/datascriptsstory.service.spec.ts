import { TestBed, inject } from '@angular/core/testing';

import { DatascriptsstoryService } from './datascriptsstory.service';

describe('DatascriptsstoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatascriptsstoryService]
    });
  });

  it('should be created', inject([DatascriptsstoryService], (service: DatascriptsstoryService) => {
    expect(service).toBeTruthy();
  }));
});
