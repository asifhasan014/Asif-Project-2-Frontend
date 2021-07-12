import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatascriptsstorydetailComponent } from './datascriptsstorydetail.component';

describe('DatascriptsstorydetailComponent', () => {
  let component: DatascriptsstorydetailComponent;
  let fixture: ComponentFixture<DatascriptsstorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatascriptsstorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatascriptsstorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
