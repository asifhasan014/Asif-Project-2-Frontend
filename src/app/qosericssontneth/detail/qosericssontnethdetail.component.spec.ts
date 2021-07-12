import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosericssontnethdetailComponent } from './qosericssontnethdetail.component';

describe('QosericssontnethdetailComponent', () => {
  let component: QosericssontnethdetailComponent;
  let fixture: ComponentFixture<QosericssontnethdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosericssontnethdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosericssontnethdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
