import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosconfigurationstandarddetailComponent } from './qosconfigurationstandarddetail.component';

describe('QosconfigurationstandarddetailComponent', () => {
  let component: QosconfigurationstandarddetailComponent;
  let fixture: ComponentFixture<QosconfigurationstandarddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosconfigurationstandarddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosconfigurationstandarddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
