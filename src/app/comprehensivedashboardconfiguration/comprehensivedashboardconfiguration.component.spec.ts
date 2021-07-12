import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivedashboardconfigurationComponent } from './comprehensivedashboardconfiguration.component';

describe('ComprehensivedashboardconfigurationComponent', () => {
  let component: ComprehensivedashboardconfigurationComponent;
  let fixture: ComponentFixture<ComprehensivedashboardconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensivedashboardconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensivedashboardconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
