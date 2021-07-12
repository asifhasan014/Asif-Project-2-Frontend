import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementmainsfailuregridComponent } from './ldsettlementmainsfailuregrid.component';

describe('LdsettlementmainsfailuregridComponent', () => {
  let component: LdsettlementmainsfailuregridComponent;
  let fixture: ComponentFixture<LdsettlementmainsfailuregridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementmainsfailuregridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementmainsfailuregridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
