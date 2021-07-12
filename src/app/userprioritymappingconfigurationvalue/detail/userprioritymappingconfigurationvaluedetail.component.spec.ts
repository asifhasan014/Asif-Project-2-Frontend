import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprioritymappingconfigurationvaluedetailComponent } from './userprioritymappingconfigurationvaluedetail.component';

describe('UserprioritymappingconfigurationvaluedetailComponent', () => {
  let component: UserprioritymappingconfigurationvaluedetailComponent;
  let fixture: ComponentFixture<UserprioritymappingconfigurationvaluedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprioritymappingconfigurationvaluedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprioritymappingconfigurationvaluedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
