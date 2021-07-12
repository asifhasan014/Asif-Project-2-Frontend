import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplayhealthverboseComponent } from './padhdisplayhealthverbose.component';

describe('PadhdisplayhealthverboseComponent', () => {
  let component: PadhdisplayhealthverboseComponent;
  let fixture: ComponentFixture<PadhdisplayhealthverboseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplayhealthverboseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplayhealthverboseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
