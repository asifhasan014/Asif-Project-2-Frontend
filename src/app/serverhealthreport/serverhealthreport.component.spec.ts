import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerhealthreportComponent } from './serverhealthreport.component';

describe('ServerhealthreportComponent', () => {
  let component: ServerhealthreportComponent;
  let fixture: ComponentFixture<ServerhealthreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerhealthreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerhealthreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
