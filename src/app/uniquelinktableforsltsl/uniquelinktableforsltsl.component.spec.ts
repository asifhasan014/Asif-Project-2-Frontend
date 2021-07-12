import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforsltslComponent } from './uniquelinktableforsltsl.component';

describe('UniquelinktableforsltslComponent', () => {
  let component: UniquelinktableforsltslComponent;
  let fixture: ComponentFixture<UniquelinktableforsltslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforsltslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforsltslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
