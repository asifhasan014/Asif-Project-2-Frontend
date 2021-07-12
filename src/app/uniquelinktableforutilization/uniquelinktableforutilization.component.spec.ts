import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforutilizationComponent } from './uniquelinktableforutilization.component';

describe('UniquelinktableforutilizationComponent', () => {
  let component: UniquelinktableforutilizationComponent;
  let fixture: ComponentFixture<UniquelinktableforutilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforutilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforutilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
