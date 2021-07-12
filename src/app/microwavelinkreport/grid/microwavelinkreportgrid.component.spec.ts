import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrowavelinkreportgridComponent } from './microwavelinkreportgrid.component';

describe('MicrowavelinkreportgridComponent', () => {
  let component: MicrowavelinkreportgridComponent;
  let fixture: ComponentFixture<MicrowavelinkreportgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrowavelinkreportgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrowavelinkreportgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
