import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueinterfacetableforutilizationComponent } from './uniqueinterfacetableforutilization.component';

describe('UniqueinterfacetableforutilizationComponent', () => {
  let component: UniqueinterfacetableforutilizationComponent;
  let fixture: ComponentFixture<UniqueinterfacetableforutilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueinterfacetableforutilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueinterfacetableforutilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
