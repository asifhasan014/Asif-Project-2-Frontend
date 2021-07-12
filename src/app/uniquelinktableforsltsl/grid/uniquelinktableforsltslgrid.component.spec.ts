import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforsltslgridComponent } from './uniquelinktableforsltslgrid.component';

describe('UniquelinktableforsltslgridComponent', () => {
  let component: UniquelinktableforsltslgridComponent;
  let fixture: ComponentFixture<UniquelinktableforsltslgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforsltslgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforsltslgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
