import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupcalendardetailComponent } from './backupcalendardetail.component';

describe('BackupcalendardetailComponent', () => {
  let component: BackupcalendardetailComponent;
  let fixture: ComponentFixture<BackupcalendardetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupcalendardetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupcalendardetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
