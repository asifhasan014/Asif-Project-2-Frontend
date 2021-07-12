import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmnameComponent } from './alarmname.component';

describe('AlarmnameComponent', () => {
  let component: AlarmnameComponent;
  let fixture: ComponentFixture<AlarmnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
