import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsltslvariationgridComponent } from './rsltslvariationgrid.component';

describe('RsltslvariationgridComponent', () => {
  let component: RsltslvariationgridComponent;
  let fixture: ComponentFixture<RsltslvariationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsltslvariationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsltslvariationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
