import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmoduslotmappinggridComponent } from './alarmoduslotmappinggrid.component';

describe('AlarmoduslotmappinggridComponent', () => {
  let component: AlarmoduslotmappinggridComponent;
  let fixture: ComponentFixture<AlarmoduslotmappinggridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmoduslotmappinggridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmoduslotmappinggridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
