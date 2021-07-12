import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoemneinventorydetailComponent } from './soemneinventorydetail.component';

describe('SoemneinventorydetailComponent', () => {
  let component: SoemneinventorydetailComponent;
  let fixture: ComponentFixture<SoemneinventorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoemneinventorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoemneinventorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
