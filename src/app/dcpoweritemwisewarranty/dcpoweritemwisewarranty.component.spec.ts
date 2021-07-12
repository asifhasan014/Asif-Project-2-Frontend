import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpoweritemwisewarrantyComponent } from './dcpoweritemwisewarranty.component';

describe('DcpoweritemwisewarrantyComponent', () => {
  let component: DcpoweritemwisewarrantyComponent;
  let fixture: ComponentFixture<DcpoweritemwisewarrantyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpoweritemwisewarrantyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpoweritemwisewarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
