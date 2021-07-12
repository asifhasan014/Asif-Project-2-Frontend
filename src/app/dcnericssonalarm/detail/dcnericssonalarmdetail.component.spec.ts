import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcnericssonalarmdetailComponent } from './dcnericssonalarmdetail.component';

describe('DcnericssonalarmdetailComponent', () => {
  let component: DcnericssonalarmdetailComponent;
  let fixture: ComponentFixture<DcnericssonalarmdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcnericssonalarmdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcnericssonalarmdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
