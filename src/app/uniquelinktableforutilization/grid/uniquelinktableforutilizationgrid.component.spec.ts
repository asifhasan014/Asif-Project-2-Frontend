import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforutilizationgridComponent } from './uniquelinktableforutilizationgrid.component';

describe('UniquelinktableforutilizationgridComponent', () => {
  let component: UniquelinktableforutilizationgridComponent;
  let fixture: ComponentFixture<UniquelinktableforutilizationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforutilizationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforutilizationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
