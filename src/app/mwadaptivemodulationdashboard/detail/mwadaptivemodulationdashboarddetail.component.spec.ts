import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwadaptivemodulationdashboarddetailComponent } from './mwadaptivemodulationdashboarddetail.component';

describe('MwadaptivemodulationdashboarddetailComponent', () => {
  let component: MwadaptivemodulationdashboarddetailComponent;
  let fixture: ComponentFixture<MwadaptivemodulationdashboarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwadaptivemodulationdashboarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwadaptivemodulationdashboarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
