import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerhealthcheckinventorydetailComponent } from './serverhealthcheckinventorydetail.component';

describe('ServerhealthcheckinventorydetailComponent', () => {
  let component: ServerhealthcheckinventorydetailComponent;
  let fixture: ComponentFixture<ServerhealthcheckinventorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerhealthcheckinventorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerhealthcheckinventorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
