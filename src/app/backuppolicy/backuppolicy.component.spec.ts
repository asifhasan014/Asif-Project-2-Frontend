import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackuppolicyComponent } from './backuppolicy.component';

describe('BackuppolicyComponent', () => {
  let component: BackuppolicyComponent;
  let fixture: ComponentFixture<BackuppolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackuppolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackuppolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
