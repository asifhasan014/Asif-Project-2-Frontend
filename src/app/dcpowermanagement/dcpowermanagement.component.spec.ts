import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowermanagementComponent } from './dcpowermanagement.component';

describe('DcpowermanagementComponent', () => {
  let component: DcpowermanagementComponent;
  let fixture: ComponentFixture<DcpowermanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowermanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
