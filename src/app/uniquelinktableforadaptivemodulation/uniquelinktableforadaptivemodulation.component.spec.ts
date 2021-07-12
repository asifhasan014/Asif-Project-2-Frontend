import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforadaptivemodulationComponent } from './uniquelinktableforadaptivemodulation.component';

describe('UniquelinktableforadaptivemodulationComponent', () => {
  let component: UniquelinktableforadaptivemodulationComponent;
  let fixture: ComponentFixture<UniquelinktableforadaptivemodulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforadaptivemodulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforadaptivemodulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
