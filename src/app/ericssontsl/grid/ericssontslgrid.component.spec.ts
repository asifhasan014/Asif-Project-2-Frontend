import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssontslgridComponent } from './ericssontslgrid.component';

describe('EricssontslgridComponent', () => {
  let component: EricssontslgridComponent;
  let fixture: ComponentFixture<EricssontslgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssontslgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssontslgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
