import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuaweilicensegridComponent } from './huaweilicensegrid.component';

describe('HuaweilicensegridComponent', () => {
  let component: HuaweilicensegridComponent;
  let fixture: ComponentFixture<HuaweilicensegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuaweilicensegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuaweilicensegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
