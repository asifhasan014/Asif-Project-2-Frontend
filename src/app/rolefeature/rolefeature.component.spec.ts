import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolefeatureComponent } from './rolefeature.component';

describe('RolefeatureComponent', () => {
  let component: RolefeatureComponent;
  let fixture: ComponentFixture<RolefeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolefeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolefeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
