import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosericssonconfigurationdatadetailComponent } from './qosericssonconfigurationdatadetail.component';

describe('QosericssonconfigurationdatadetailComponent', () => {
  let component: QosericssonconfigurationdatadetailComponent;
  let fixture: ComponentFixture<QosericssonconfigurationdatadetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosericssonconfigurationdatadetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosericssonconfigurationdatadetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
