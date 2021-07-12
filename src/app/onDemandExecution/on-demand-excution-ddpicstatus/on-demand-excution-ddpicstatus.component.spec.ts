import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandExcutionDdpicstatusComponent } from './on-demand-excution-ddpicstatus.component';

describe('OnDemandExcutionDdpicstatusComponent', () => {
  let component: OnDemandExcutionDdpicstatusComponent;
  let fixture: ComponentFixture<OnDemandExcutionDdpicstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandExcutionDdpicstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandExcutionDdpicstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
