import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctioncodeComponent } from './functioncode.component';

describe('FunctioncodeComponent', () => {
  let component: FunctioncodeComponent;
  let fixture: ComponentFixture<FunctioncodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctioncodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctioncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
