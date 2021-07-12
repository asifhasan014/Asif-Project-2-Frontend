import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpoweractivitywiseslaComponent } from './dcpoweractivitywisesla.component';

describe('DcpoweractivitywiseslaComponent', () => {
  let component: DcpoweractivitywiseslaComponent;
  let fixture: ComponentFixture<DcpoweractivitywiseslaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpoweractivitywiseslaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpoweractivitywiseslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
