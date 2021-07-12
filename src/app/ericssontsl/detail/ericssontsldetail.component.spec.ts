import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssontsldetailComponent } from './ericssontsldetail.component';

describe('EricssontsldetailComponent', () => {
  let component: EricssontsldetailComponent;
  let fixture: ComponentFixture<EricssontsldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssontsldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssontsldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
