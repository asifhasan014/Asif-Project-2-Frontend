import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquelinktableforsltsldetailComponent } from './uniquelinktableforsltsldetail.component';

describe('UniquelinktableforsltsldetailComponent', () => {
  let component: UniquelinktableforsltsldetailComponent;
  let fixture: ComponentFixture<UniquelinktableforsltsldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquelinktableforsltsldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquelinktableforsltsldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
