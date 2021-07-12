import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplayhealthverbosedetailComponent } from './padhdisplayhealthverbosedetail.component';

describe('PadhdisplayhealthverbosedetailComponent', () => {
  let component: PadhdisplayhealthverbosedetailComponent;
  let fixture: ComponentFixture<PadhdisplayhealthverbosedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplayhealthverbosedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplayhealthverbosedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
