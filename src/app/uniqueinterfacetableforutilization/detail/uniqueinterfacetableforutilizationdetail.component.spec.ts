import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueinterfacetableforutilizationdetailComponent } from './uniqueinterfacetableforutilizationdetail.component';

describe('UniqueinterfacetableforutilizationdetailComponent', () => {
  let component: UniqueinterfacetableforutilizationdetailComponent;
  let fixture: ComponentFixture<UniqueinterfacetableforutilizationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueinterfacetableforutilizationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueinterfacetableforutilizationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
