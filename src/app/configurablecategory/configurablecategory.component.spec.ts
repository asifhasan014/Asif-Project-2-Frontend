import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurablecategoryComponent } from './configurablecategory.component';

describe('ConfigurablecategoryComponent', () => {
  let component: ConfigurablecategoryComponent;
  let fixture: ComponentFixture<ConfigurablecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurablecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurablecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
