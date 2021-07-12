import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackuppolicydetailComponent } from './backuppolicydetail.component';

describe('BackuppolicydetailComponent', () => {
  let component: BackuppolicydetailComponent;
  let fixture: ComponentFixture<BackuppolicydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackuppolicydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackuppolicydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
