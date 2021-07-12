import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensivedashboardComponent } from './comprehensivedashboard.component';

describe('ComprehensivedashboardComponent', () => {
  let component: ComprehensivedashboardComponent;
  let fixture: ComponentFixture<ComprehensivedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensivedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensivedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
