import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwalarmdashboardgridComponent } from './mwalarmdashboardgrid.component';

describe('MwalarmdashboardgridComponent', () => {
  let component: MwalarmdashboardgridComponent;
  let fixture: ComponentFixture<MwalarmdashboardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwalarmdashboardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwalarmdashboardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
