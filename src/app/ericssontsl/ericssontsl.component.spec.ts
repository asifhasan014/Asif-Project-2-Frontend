import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssontslComponent } from './ericssontsl.component';

describe('EricssontslComponent', () => {
  let component: EricssontslComponent;
  let fixture: ComponentFixture<EricssontslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssontslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssontslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
