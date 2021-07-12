import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosericssontnethgridComponent } from './qosericssontnethgrid.component';

describe('QosericssontnethgridComponent', () => {
  let component: QosericssontnethgridComponent;
  let fixture: ComponentFixture<QosericssontnethgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosericssontnethgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosericssontnethgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
