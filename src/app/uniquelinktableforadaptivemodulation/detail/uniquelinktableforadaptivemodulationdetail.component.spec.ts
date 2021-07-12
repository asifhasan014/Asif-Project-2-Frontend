import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforadaptivemodulationdetailComponent } from './uniquelinktableforadaptivemodulationdetail.component';

describe('UniquelinktableforadaptivemodulationdetailComponent', () => {
  let component: UniquelinktableforadaptivemodulationdetailComponent;
  let fixture: ComponentFixture<UniquelinktableforadaptivemodulationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforadaptivemodulationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforadaptivemodulationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
