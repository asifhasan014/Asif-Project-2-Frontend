import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkfromdigitouchgridComponent } from './linkfromdigitouchgrid.component';

describe('LinkfromdigitouchgridComponent', () => {
  let component: LinkfromdigitouchgridComponent;
  let fixture: ComponentFixture<LinkfromdigitouchgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkfromdigitouchgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkfromdigitouchgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
