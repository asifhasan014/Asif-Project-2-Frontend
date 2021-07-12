import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationhierarchyossgridComponent } from './locationhierarchyossgrid.component';

describe('LocationhierarchyossgridComponent', () => {
  let component: LocationhierarchyossgridComponent;
  let fixture: ComponentFixture<LocationhierarchyossgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationhierarchyossgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationhierarchyossgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
