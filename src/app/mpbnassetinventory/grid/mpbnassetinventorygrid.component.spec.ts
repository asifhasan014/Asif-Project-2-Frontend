import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpbnassetinventorygridComponent } from './mpbnassetinventorygrid.component';

describe('MpbnassetinventorygridComponent', () => {
  let component: MpbnassetinventorygridComponent;
  let fixture: ComponentFixture<MpbnassetinventorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpbnassetinventorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpbnassetinventorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
