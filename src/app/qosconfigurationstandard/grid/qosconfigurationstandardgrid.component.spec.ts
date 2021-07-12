import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QosconfigurationstandardgridComponent } from './qosconfigurationstandardgrid.component';

describe('QosconfigurationstandardgridComponent', () => {
  let component: QosconfigurationstandardgridComponent;
  let fixture: ComponentFixture<QosconfigurationstandardgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QosconfigurationstandardgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QosconfigurationstandardgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
