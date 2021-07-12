import { TestBed } from '@angular/core/testing';

import { OndemandExecutionService } from './ondemand-execution.service';

describe('OndemandExecutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OndemandExecutionService = TestBed.get(OndemandExecutionService);
    expect(service).toBeTruthy();
  });
});
