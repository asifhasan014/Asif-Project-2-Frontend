import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsltslvariationComponent } from './rsltslvariation.component';

describe('RsltslvariationComponent', () => {
  let component: RsltslvariationComponent;
  let fixture: ComponentFixture<RsltslvariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsltslvariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsltslvariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
