import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosconfigurationstandardComponent } from './qosconfigurationstandard.component';

describe('QosconfigurationstandardComponent', () => {
  let component: QosconfigurationstandardComponent;
  let fixture: ComponentFixture<QosconfigurationstandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosconfigurationstandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosconfigurationstandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
