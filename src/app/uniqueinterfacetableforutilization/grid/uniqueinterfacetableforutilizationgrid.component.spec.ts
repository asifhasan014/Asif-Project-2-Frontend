import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueinterfacetableforutilizationgridComponent } from './uniqueinterfacetableforutilizationgrid.component';

describe('UniqueinterfacetableforutilizationgridComponent', () => {
  let component: UniqueinterfacetableforutilizationgridComponent;
  let fixture: ComponentFixture<UniqueinterfacetableforutilizationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueinterfacetableforutilizationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueinterfacetableforutilizationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
