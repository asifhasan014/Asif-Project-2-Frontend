import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosradioqualityericssongridComponent } from './qosradioqualityericssongrid.component';

describe('QosradioqualityericssongridComponent', () => {
  let component: QosradioqualityericssongridComponent;
  let fixture: ComponentFixture<QosradioqualityericssongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosradioqualityericssongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosradioqualityericssongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
