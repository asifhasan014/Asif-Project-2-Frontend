import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadhdisplayhealthverbosegridComponent } from './padhdisplayhealthverbosegrid.component';

describe('PadhdisplayhealthverbosegridComponent', () => {
  let component: PadhdisplayhealthverbosegridComponent;
  let fixture: ComponentFixture<PadhdisplayhealthverbosegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadhdisplayhealthverbosegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadhdisplayhealthverbosegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
