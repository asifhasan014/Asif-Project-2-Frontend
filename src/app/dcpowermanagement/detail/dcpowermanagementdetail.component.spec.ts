import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowermanagementdetailComponent } from './dcpowermanagementdetail.component';

describe('DcpowermanagementdetailComponent', () => {
  let component: DcpowermanagementdetailComponent;
  let fixture: ComponentFixture<DcpowermanagementdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowermanagementdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowermanagementdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
