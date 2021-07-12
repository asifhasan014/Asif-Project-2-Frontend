import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationhierarchyossdetailComponent } from './locationhierarchyossdetail.component';

describe('LocationhierarchyossdetailComponent', () => {
  let component: LocationhierarchyossdetailComponent;
  let fixture: ComponentFixture<LocationhierarchyossdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationhierarchyossdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationhierarchyossdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
