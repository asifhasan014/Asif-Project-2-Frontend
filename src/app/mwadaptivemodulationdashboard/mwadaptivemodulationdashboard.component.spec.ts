import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwadaptivemodulationdashboardComponent } from './mwadaptivemodulationdashboard.component';

describe('MwadaptivemodulationdashboardComponent', () => {
  let component: MwadaptivemodulationdashboardComponent;
  let fixture: ComponentFixture<MwadaptivemodulationdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwadaptivemodulationdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwadaptivemodulationdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
