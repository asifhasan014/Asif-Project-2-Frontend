import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsadisplayfirewallsessiongridComponent } from './fsadisplayfirewallsessiongrid.component';

describe('FsadisplayfirewallsessiongridComponent', () => {
  let component: FsadisplayfirewallsessiongridComponent;
  let fixture: ComponentFixture<FsadisplayfirewallsessiongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsadisplayfirewallsessiongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsadisplayfirewallsessiongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
