import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwalarmdashboardComponent } from './mwalarmdashboard.component';

describe('MwalarmdashboardComponent', () => {
  let component: MwalarmdashboardComponent;
  let fixture: ComponentFixture<MwalarmdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwalarmdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwalarmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
