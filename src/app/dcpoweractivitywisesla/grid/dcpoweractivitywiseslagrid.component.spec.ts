import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpoweractivitywiseslagridComponent } from './dcpoweractivitywiseslagrid.component';

describe('DcpoweractivitywiseslagridComponent', () => {
  let component: DcpoweractivitywiseslagridComponent;
  let fixture: ComponentFixture<DcpoweractivitywiseslagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpoweractivitywiseslagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpoweractivitywiseslagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
