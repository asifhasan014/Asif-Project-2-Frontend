import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationhierarchyossComponent } from './locationhierarchyoss.component';

describe('LocationhierarchyossComponent', () => {
  let component: LocationhierarchyossComponent;
  let fixture: ComponentFixture<LocationhierarchyossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationhierarchyossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationhierarchyossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
