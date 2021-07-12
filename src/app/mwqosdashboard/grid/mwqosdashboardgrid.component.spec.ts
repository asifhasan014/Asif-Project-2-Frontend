import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwqosdashboardgridComponent } from './mwqosdashboardgrid.component';

describe('MwqosdashboardgridComponent', () => {
  let component: MwqosdashboardgridComponent;
  let fixture: ComponentFixture<MwqosdashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwqosdashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwqosdashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
