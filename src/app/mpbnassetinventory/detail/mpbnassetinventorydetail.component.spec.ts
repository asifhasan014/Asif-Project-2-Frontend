import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpbnassetinventorydetailComponent } from './mpbnassetinventorydetail.component';

describe('MpbnassetinventorydetailComponent', () => {
  let component: MpbnassetinventorydetailComponent;
  let fixture: ComponentFixture<MpbnassetinventorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpbnassetinventorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpbnassetinventorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
