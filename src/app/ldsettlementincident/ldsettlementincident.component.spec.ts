import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementincidentComponent } from './ldsettlementincident.component';

describe('LdsettlementincidentComponent', () => {
  let component: LdsettlementincidentComponent;
  let fixture: ComponentFixture<LdsettlementincidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementincidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementincidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
