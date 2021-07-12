import { TestBed, inject } from '@angular/core/testing';

import { HuaweiinterfaceportreportService } from './huaweiinterfaceportreport.service';

describe('HuaweiinterfaceportreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuaweiinterfaceportreportService]
    });
  });

  it('should be created', inject([HuaweiinterfaceportreportService], (service: HuaweiinterfaceportreportService) => {
    expect(service).toBeTruthy();
  }));
});
