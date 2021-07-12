import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivedashboardconfigurationgridComponent } from './comprehensivedashboardconfigurationgrid.component';

describe('ComprehensivedashboardconfigurationgridComponent', () => {
  let component: ComprehensivedashboardconfigurationgridComponent;
  let fixture: ComponentFixture<ComprehensivedashboardconfigurationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensivedashboardconfigurationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensivedashboardconfigurationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
