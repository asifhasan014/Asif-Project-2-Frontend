import { TestBed, inject } from '@angular/core/testing';

import { HuaweiqosService } from './huaweiqos.service';

describe('HuaweiqosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HuaweiqosService]
    });
  });

  it('should be created', inject([HuaweiqosService], (service: HuaweiqosService) => {
    expect(service).toBeTruthy();
  }));
});
