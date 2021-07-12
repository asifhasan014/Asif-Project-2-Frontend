import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweilicenseComponent } from './huaweilicense.component';

describe('HuaweilicenseComponent', () => {
  let component: HuaweilicenseComponent;
  let fixture: ComponentFixture<HuaweilicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweilicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweilicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
