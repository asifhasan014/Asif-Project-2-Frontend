import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurablecategorygridComponent } from './configurablecategorygrid.component';

describe('ConfigurablecategorygridComponent', () => {
  let component: ConfigurablecategorygridComponent;
  let fixture: ComponentFixture<ConfigurablecategorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurablecategorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurablecategorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
