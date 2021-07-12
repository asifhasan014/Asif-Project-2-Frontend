import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandEmsFileDirectoryCheckComponent } from './on-demand-ems-file-directory-check.component';

describe('OnDemandEmsFileDirectoryCheckComponent', () => {
  let component: OnDemandEmsFileDirectoryCheckComponent;
  let fixture: ComponentFixture<OnDemandEmsFileDirectoryCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnDemandEmsFileDirectoryCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnDemandEmsFileDirectoryCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
