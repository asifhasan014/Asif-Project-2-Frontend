import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementdclowComponent } from './ldsettlementdclow.component';

describe('LdsettlementdclowComponent', () => {
  let component: LdsettlementdclowComponent;
  let fixture: ComponentFixture<LdsettlementdclowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementdclowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementdclowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
