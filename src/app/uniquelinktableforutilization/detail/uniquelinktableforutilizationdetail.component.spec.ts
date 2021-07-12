import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforutilizationdetailComponent } from './uniquelinktableforutilizationdetail.component';

describe('UniquelinktableforutilizationdetailComponent', () => {
  let component: UniquelinktableforutilizationdetailComponent;
  let fixture: ComponentFixture<UniquelinktableforutilizationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforutilizationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforutilizationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
