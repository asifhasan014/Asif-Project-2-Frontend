import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkfromdigitouchdetailComponent } from './linkfromdigitouchdetail.component';

describe('LinkfromdigitouchdetailComponent', () => {
  let component: LinkfromdigitouchdetailComponent;
  let fixture: ComponentFixture<LinkfromdigitouchdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkfromdigitouchdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkfromdigitouchdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
