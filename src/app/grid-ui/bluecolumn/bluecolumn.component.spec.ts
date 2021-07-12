import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluecolumnComponent } from './bluecolumn.component';

describe('BluecolumnComponent', () => {
  let component: BluecolumnComponent;
  let fixture: ComponentFixture<BluecolumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluecolumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluecolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
