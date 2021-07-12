import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsltslvariationdetailComponent } from './rsltslvariationdetail.component';

describe('RsltslvariationdetailComponent', () => {
  let component: RsltslvariationdetailComponent;
  let fixture: ComponentFixture<RsltslvariationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsltslvariationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsltslvariationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
