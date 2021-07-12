import { TestBed, inject } from "@angular/core/testing";

import { SampledashboardService } from "./sampledashboard.service";

describe("SampledashboardService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampledashboardService],
    });
  });

  it("should be created", inject(
    [SampledashboardService],
    (service: SampledashboardService) => {
      expect(service).toBeTruthy();
    }
  ));
});
