import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcnericssonalarmComponent } from './dcnericssonalarm.component';

describe('DcnericssonalarmComponent', () => {
  let component: DcnericssonalarmComponent;
  let fixture: ComponentFixture<DcnericssonalarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcnericssonalarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcnericssonalarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
