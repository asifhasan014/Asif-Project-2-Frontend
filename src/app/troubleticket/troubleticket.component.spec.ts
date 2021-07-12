import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleticketComponent } from './troubleticket.component';

describe('TroubleticketComponent', () => {
  let component: TroubleticketComponent;
  let fixture: ComponentFixture<TroubleticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
