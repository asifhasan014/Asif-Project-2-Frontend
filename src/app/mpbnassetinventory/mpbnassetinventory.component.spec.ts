import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpbnassetinventoryComponent } from './mpbnassetinventory.component';

describe('MpbnassetinventoryComponent', () => {
  let component: MpbnassetinventoryComponent;
  let fixture: ComponentFixture<MpbnassetinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpbnassetinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpbnassetinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
