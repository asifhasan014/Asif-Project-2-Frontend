import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpoweritemwisewarrantydetailComponent } from './dcpoweritemwisewarrantydetail.component';

describe('DcpoweritemwisewarrantydetailComponent', () => {
  let component: DcpoweritemwisewarrantydetailComponent;
  let fixture: ComponentFixture<DcpoweritemwisewarrantydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpoweritemwisewarrantydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpoweritemwisewarrantydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
