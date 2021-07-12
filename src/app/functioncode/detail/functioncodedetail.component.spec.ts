import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctioncodedetailComponent } from './functioncodedetail.component';

describe('FunctioncodedetailComponent', () => {
  let component: FunctioncodedetailComponent;
  let fixture: ComponentFixture<FunctioncodedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctioncodedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctioncodedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
