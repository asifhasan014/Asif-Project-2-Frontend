import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivedashboarddetailComponent } from './comprehensivedashboarddetail.component';

describe('ComprehensivedashboarddetailComponent', () => {
  let component: ComprehensivedashboarddetailComponent;
  let fixture: ComponentFixture<ComprehensivedashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensivedashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensivedashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
