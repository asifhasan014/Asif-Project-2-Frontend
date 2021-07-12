import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Performancedatau2000ipdetailComponent } from './performancedatau2000ipdetail.component';

describe('Performancedatau2000ipdetailComponent', () => {
  let component: Performancedatau2000ipdetailComponent;
  let fixture: ComponentFixture<Performancedatau2000ipdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Performancedatau2000ipdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Performancedatau2000ipdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
