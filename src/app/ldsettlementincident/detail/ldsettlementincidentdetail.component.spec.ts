import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementincidentdetailComponent } from './ldsettlementincidentdetail.component';

describe('LdsettlementincidentdetailComponent', () => {
  let component: LdsettlementincidentdetailComponent;
  let fixture: ComponentFixture<LdsettlementincidentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementincidentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementincidentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
