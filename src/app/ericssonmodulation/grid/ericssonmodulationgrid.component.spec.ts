import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonmodulationgridComponent } from './ericssonmodulationgrid.component';

describe('EricssonmodulationgridComponent', () => {
  let component: EricssonmodulationgridComponent;
  let fixture: ComponentFixture<EricssonmodulationgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonmodulationgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonmodulationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
