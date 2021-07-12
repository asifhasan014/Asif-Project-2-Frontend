import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosradioqualityericssonComponent } from './qosradioqualityericsson.component';

describe('QosradioqualityericssonComponent', () => {
  let component: QosradioqualityericssonComponent;
  let fixture: ComponentFixture<QosradioqualityericssonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosradioqualityericssonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosradioqualityericssonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
