import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerhealthreportgridComponent } from './serverhealthreportgrid.component';

describe('ServerhealthreportgridComponent', () => {
  let component: ServerhealthreportgridComponent;
  let fixture: ComponentFixture<ServerhealthreportgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerhealthreportgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerhealthreportgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
