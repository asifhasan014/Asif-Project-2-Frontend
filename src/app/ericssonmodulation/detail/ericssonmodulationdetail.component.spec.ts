import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonmodulationdetailComponent } from './ericssonmodulationdetail.component';

describe('EricssonmodulationdetailComponent', () => {
  let component: EricssonmodulationdetailComponent;
  let fixture: ComponentFixture<EricssonmodulationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonmodulationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonmodulationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
