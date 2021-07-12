import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackuppolicygridComponent } from './backuppolicygrid.component';

describe('BackuppolicygridComponent', () => {
  let component: BackuppolicygridComponent;
  let fixture: ComponentFixture<BackuppolicygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackuppolicygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackuppolicygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
