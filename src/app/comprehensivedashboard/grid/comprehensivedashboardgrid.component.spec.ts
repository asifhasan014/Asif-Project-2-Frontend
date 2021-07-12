import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivedashboardgridComponent } from './comprehensivedashboardgrid.component';

describe('ComprehensivedashboardgridComponent', () => {
  let component: ComprehensivedashboardgridComponent;
  let fixture: ComponentFixture<ComprehensivedashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensivedashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensivedashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
