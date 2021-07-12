import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementexternalalarmdetailComponent } from './ldsettlementexternalalarmdetail.component';

describe('LdsettlementexternalalarmdetailComponent', () => {
  let component: LdsettlementexternalalarmdetailComponent;
  let fixture: ComponentFixture<LdsettlementexternalalarmdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementexternalalarmdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementexternalalarmdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
