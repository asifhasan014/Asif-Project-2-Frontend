import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyhitipreportComponent } from './denyhitipreport.component';

describe('DenyhitipreportComponent', () => {
  let component: DenyhitipreportComponent;
  let fixture: ComponentFixture<DenyhitipreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenyhitipreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyhitipreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
