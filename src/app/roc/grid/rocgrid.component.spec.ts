import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RocgridComponent } from './rocgrid.component';

describe('RocgridComponent', () => {
  let component: RocgridComponent;
  let fixture: ComponentFixture<RocgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RocgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
