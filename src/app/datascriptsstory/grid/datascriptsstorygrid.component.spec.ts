import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatascriptsstorygridComponent } from './datascriptsstorygrid.component';

describe('DatascriptsstorygridComponent', () => {
  let component: DatascriptsstorygridComponent;
  let fixture: ComponentFixture<DatascriptsstorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatascriptsstorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatascriptsstorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
