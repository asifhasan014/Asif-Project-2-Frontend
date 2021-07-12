import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprioritymappingconfigurationvalueComponent } from './userprioritymappingconfigurationvalue.component';

describe('UserprioritymappingconfigurationvalueComponent', () => {
  let component: UserprioritymappingconfigurationvalueComponent;
  let fixture: ComponentFixture<UserprioritymappingconfigurationvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprioritymappingconfigurationvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprioritymappingconfigurationvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
