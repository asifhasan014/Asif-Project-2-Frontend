import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmnamedetailComponent } from './alarmnamedetail.component';

describe('AlarmnamedetailComponent', () => {
  let component: AlarmnamedetailComponent;
  let fixture: ComponentFixture<AlarmnamedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmnamedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmnamedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
