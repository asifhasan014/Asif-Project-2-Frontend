import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweilicensedetailComponent } from './huaweilicensedetail.component';

describe('HuaweilicensedetailComponent', () => {
  let component: HuaweilicensedetailComponent;
  let fixture: ComponentFixture<HuaweilicensedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweilicensedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweilicensedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
