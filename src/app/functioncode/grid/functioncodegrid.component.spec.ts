import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctioncodegridComponent } from './functioncodegrid.component';

describe('FunctioncodegridComponent', () => {
  let component: FunctioncodegridComponent;
  let fixture: ComponentFixture<FunctioncodegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctioncodegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctioncodegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
