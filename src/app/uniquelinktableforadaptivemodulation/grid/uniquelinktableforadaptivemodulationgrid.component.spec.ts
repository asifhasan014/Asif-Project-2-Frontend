import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforadaptivemodulationgridComponent } from './uniquelinktableforadaptivemodulationgrid.component';

describe('UniquelinktableforadaptivemodulationgridComponent', () => {
  let component: UniquelinktableforadaptivemodulationgridComponent;
  let fixture: ComponentFixture<UniquelinktableforadaptivemodulationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforadaptivemodulationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforadaptivemodulationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
