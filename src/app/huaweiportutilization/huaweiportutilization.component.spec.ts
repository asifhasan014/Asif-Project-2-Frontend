import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiportutilizationComponent } from './huaweiportutilization.component';

describe('HuaweiportutilizationComponent', () => {
  let component: HuaweiportutilizationComponent;
  let fixture: ComponentFixture<HuaweiportutilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiportutilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiportutilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
