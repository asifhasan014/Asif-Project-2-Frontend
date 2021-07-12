import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweiportutilizationgridComponent } from './huaweiportutilizationgrid.component';

describe('HuaweiportutilizationgridComponent', () => {
  let component: HuaweiportutilizationgridComponent;
  let fixture: ComponentFixture<HuaweiportutilizationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweiportutilizationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweiportutilizationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
