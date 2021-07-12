import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcnericssonalarmgridComponent } from './dcnericssonalarmgrid.component';

describe('DcnericssonalarmgridComponent', () => {
  let component: DcnericssonalarmgridComponent;
  let fixture: ComponentFixture<DcnericssonalarmgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcnericssonalarmgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcnericssonalarmgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
