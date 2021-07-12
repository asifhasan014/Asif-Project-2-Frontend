import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowermanagementgridComponent } from './dcpowermanagementgrid.component';

describe('DcpowermanagementgridComponent', () => {
  let component: DcpowermanagementgridComponent;
  let fixture: ComponentFixture<DcpowermanagementgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowermanagementgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowermanagementgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
