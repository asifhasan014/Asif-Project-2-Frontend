import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleticketdetailComponent } from './troubleticketdetail.component';

describe('TroubleticketdetailComponent', () => {
  let component: TroubleticketdetailComponent;
  let fixture: ComponentFixture<TroubleticketdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleticketdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleticketdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
