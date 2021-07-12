import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerhealthcheckinventorygridComponent } from './serverhealthcheckinventorygrid.component';

describe('ServerhealthcheckinventorygridComponent', () => {
  let component: ServerhealthcheckinventorygridComponent;
  let fixture: ComponentFixture<ServerhealthcheckinventorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerhealthcheckinventorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerhealthcheckinventorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
