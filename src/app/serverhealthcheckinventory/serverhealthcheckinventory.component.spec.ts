import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerhealthcheckinventoryComponent } from './serverhealthcheckinventory.component';

describe('ServerhealthcheckinventoryComponent', () => {
  let component: ServerhealthcheckinventoryComponent;
  let fixture: ComponentFixture<ServerhealthcheckinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerhealthcheckinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerhealthcheckinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
