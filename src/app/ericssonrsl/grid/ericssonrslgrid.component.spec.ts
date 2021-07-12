import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonrslgridComponent } from './ericssonrslgrid.component';

describe('EricssonrslgridComponent', () => {
  let component: EricssonrslgridComponent;
  let fixture: ComponentFixture<EricssonrslgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonrslgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonrslgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
