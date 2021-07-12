import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementpgdetailComponent } from './ldsettlementpgdetail.component';

describe('LdsettlementpgdetailComponent', () => {
  let component: LdsettlementpgdetailComponent;
  let fixture: ComponentFixture<LdsettlementpgdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementpgdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementpgdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
