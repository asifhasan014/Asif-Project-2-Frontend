import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosericssonconfigurationdataComponent } from './qosericssonconfigurationdata.component';

describe('QosericssonconfigurationdataComponent', () => {
  let component: QosericssonconfigurationdataComponent;
  let fixture: ComponentFixture<QosericssonconfigurationdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosericssonconfigurationdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosericssonconfigurationdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
