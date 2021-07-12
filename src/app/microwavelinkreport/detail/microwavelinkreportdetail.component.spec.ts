import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrowavelinkreportdetailComponent } from './microwavelinkreportdetail.component';

describe('MicrowavelinkreportdetailComponent', () => {
  let component: MicrowavelinkreportdetailComponent;
  let fixture: ComponentFixture<MicrowavelinkreportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrowavelinkreportdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrowavelinkreportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
