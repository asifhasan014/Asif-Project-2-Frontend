import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolegridComponent } from './rolegrid.component';

describe('RolegridComponent', () => {
  let component: RolegridComponent;
  let fixture: ComponentFixture<RolegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
