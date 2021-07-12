import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupcalendargridComponent } from './backupcalendargrid.component';

describe('BackupcalendargridComponent', () => {
  let component: BackupcalendargridComponent;
  let fixture: ComponentFixture<BackupcalendargridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupcalendargridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupcalendargridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
