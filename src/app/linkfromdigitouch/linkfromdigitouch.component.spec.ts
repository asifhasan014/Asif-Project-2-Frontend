import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkfromdigitouchComponent } from './linkfromdigitouch.component';

describe('LinkfromdigitouchComponent', () => {
  let component: LinkfromdigitouchComponent;
  let fixture: ComponentFixture<LinkfromdigitouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkfromdigitouchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkfromdigitouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
