import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsettlementsitedownComponent } from './ldsettlementsitedown.component';

describe('LdsettlementsitedownComponent', () => {
  let component: LdsettlementsitedownComponent;
  let fixture: ComponentFixture<LdsettlementsitedownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsettlementsitedownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsettlementsitedownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
