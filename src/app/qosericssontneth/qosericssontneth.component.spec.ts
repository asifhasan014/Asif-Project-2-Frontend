import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosericssontnethComponent } from './qosericssontneth.component';

describe('QosericssontnethComponent', () => {
  let component: QosericssontnethComponent;
  let fixture: ComponentFixture<QosericssontnethComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosericssontnethComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosericssontnethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
