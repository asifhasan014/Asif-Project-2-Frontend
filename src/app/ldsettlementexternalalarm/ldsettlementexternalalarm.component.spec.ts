import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementexternalalarmComponent } from './ldsettlementexternalalarm.component';

describe('LdsettlementexternalalarmComponent', () => {
  let component: LdsettlementexternalalarmComponent;
  let fixture: ComponentFixture<LdsettlementexternalalarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementexternalalarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementexternalalarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
