import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoemneinventoryComponent } from './soemneinventory.component';

describe('SoemneinventoryComponent', () => {
  let component: SoemneinventoryComponent;
  let fixture: ComponentFixture<SoemneinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoemneinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoemneinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
