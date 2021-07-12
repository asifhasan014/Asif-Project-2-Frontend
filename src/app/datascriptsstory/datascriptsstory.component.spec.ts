import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatascriptsstoryComponent } from './datascriptsstory.component';

describe('DatascriptsstoryComponent', () => {
  let component: DatascriptsstoryComponent;
  let fixture: ComponentFixture<DatascriptsstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatascriptsstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatascriptsstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
