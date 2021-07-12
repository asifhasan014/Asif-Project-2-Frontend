import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandDisplayHealthVerboseComponent } from './on-demand-display-health-verbose.component';

describe('OnDemandDisplayHealthVerboseComponent', () => {
  let component: OnDemandDisplayHealthVerboseComponent;
  let fixture: ComponentFixture<OnDemandDisplayHealthVerboseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandDisplayHealthVerboseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandDisplayHealthVerboseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
