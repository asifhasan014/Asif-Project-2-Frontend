import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoledetailComponent } from './roledetail.component';

describe('RoledetailComponent', () => {
  let component: RoledetailComponent;
  let fixture: ComponentFixture<RoledetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoledetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
