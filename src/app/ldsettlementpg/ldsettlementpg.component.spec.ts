import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementpgComponent } from './ldsettlementpg.component';

describe('LdsettlementpgComponent', () => {
  let component: LdsettlementpgComponent;
  let fixture: ComponentFixture<LdsettlementpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
