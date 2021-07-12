import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementmainsfailureComponent } from './ldsettlementmainsfailure.component';

describe('LdsettlementmainsfailureComponent', () => {
  let component: LdsettlementmainsfailureComponent;
  let fixture: ComponentFixture<LdsettlementmainsfailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementmainsfailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementmainsfailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
