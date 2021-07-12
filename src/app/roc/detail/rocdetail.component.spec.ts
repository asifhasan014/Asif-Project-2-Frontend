import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RocdetailComponent } from './rocdetail.component';

describe('RocdetailComponent', () => {
  let component: RocdetailComponent;
  let fixture: ComponentFixture<RocdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RocdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
