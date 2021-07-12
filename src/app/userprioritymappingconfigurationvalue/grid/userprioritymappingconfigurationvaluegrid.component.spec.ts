import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprioritymappingconfigurationvaluegridComponent } from './userprioritymappingconfigurationvaluegrid.component';

describe('UserprioritymappingconfigurationvaluegridComponent', () => {
  let component: UserprioritymappingconfigurationvaluegridComponent;
  let fixture: ComponentFixture<UserprioritymappingconfigurationvaluegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprioritymappingconfigurationvaluegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprioritymappingconfigurationvaluegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
