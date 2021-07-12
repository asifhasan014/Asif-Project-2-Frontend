import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsadisplayfirewallsessionComponent } from './fsadisplayfirewallsession.component';

describe('FsadisplayfirewallsessionComponent', () => {
  let component: FsadisplayfirewallsessionComponent;
  let fixture: ComponentFixture<FsadisplayfirewallsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsadisplayfirewallsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsadisplayfirewallsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
