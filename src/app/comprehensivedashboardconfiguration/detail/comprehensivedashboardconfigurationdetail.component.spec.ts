import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivedashboardconfigurationdetailComponent } from './comprehensivedashboardconfigurationdetail.component';

describe('ComprehensivedashboardconfigurationdetailComponent', () => {
  let component: ComprehensivedashboardconfigurationdetailComponent;
  let fixture: ComponentFixture<ComprehensivedashboardconfigurationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensivedashboardconfigurationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensivedashboardconfigurationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
