import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleticketgridComponent } from './troubleticketgrid.component';

describe('TroubleticketgridComponent', () => {
  let component: TroubleticketgridComponent;
  let fixture: ComponentFixture<TroubleticketgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleticketgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleticketgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
