import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrowavelinkreportComponent } from './microwavelinkreport.component';

describe('MicrowavelinkreportComponent', () => {
  let component: MicrowavelinkreportComponent;
  let fixture: ComponentFixture<MicrowavelinkreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrowavelinkreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrowavelinkreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
