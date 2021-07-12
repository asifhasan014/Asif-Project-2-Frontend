import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementdecisionComponent } from './ldsettlementdecision.component';

describe('LdsettlementdecisionComponent', () => {
  let component: LdsettlementdecisionComponent;
  let fixture: ComponentFixture<LdsettlementdecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementdecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementdecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
