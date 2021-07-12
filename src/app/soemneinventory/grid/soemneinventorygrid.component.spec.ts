import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoemneinventorygridComponent } from './soemneinventorygrid.component';

describe('SoemneinventorygridComponent', () => {
  let component: SoemneinventorygridComponent;
  let fixture: ComponentFixture<SoemneinventorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoemneinventorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoemneinventorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
