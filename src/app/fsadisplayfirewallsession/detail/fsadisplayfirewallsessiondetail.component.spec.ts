import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsadisplayfirewallsessiondetailComponent } from './fsadisplayfirewallsessiondetail.component';

describe('FsadisplayfirewallsessiondetailComponent', () => {
  let component: FsadisplayfirewallsessiondetailComponent;
  let fixture: ComponentFixture<FsadisplayfirewallsessiondetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsadisplayfirewallsessiondetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsadisplayfirewallsessiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
