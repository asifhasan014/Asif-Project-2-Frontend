import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosericssonconfigurationdatagridComponent } from './qosericssonconfigurationdatagrid.component';

describe('QosericssonconfigurationdatagridComponent', () => {
  let component: QosericssonconfigurationdatagridComponent;
  let fixture: ComponentFixture<QosericssonconfigurationdatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosericssonconfigurationdatagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosericssonconfigurationdatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
