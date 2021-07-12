import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonmodulationComponent } from './ericssonmodulation.component';

describe('EricssonmodulationComponent', () => {
  let component: EricssonmodulationComponent;
  let fixture: ComponentFixture<EricssonmodulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonmodulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonmodulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
