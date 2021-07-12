import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiportutilizationdetailComponent } from './huaweiportutilizationdetail.component';

describe('HuaweiportutilizationdetailComponent', () => {
  let component: HuaweiportutilizationdetailComponent;
  let fixture: ComponentFixture<HuaweiportutilizationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiportutilizationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiportutilizationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
