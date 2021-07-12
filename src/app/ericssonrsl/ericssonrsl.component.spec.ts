import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EricssonrslComponent } from './ericssonrsl.component';

describe('EricssonrslComponent', () => {
  let component: EricssonrslComponent;
  let fixture: ComponentFixture<EricssonrslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EricssonrslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EricssonrslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
