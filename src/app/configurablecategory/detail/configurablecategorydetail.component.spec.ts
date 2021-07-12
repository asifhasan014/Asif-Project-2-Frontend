import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurablecategorydetailComponent } from './configurablecategorydetail.component';

describe('ConfigurablecategorydetailComponent', () => {
  let component: ConfigurablecategorydetailComponent;
  let fixture: ComponentFixture<ConfigurablecategorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurablecategorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurablecategorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
