import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupnodedetailComponent } from './backupnodedetail.component';

describe('BackupnodedetailComponent', () => {
  let component: BackupnodedetailComponent;
  let fixture: ComponentFixture<BackupnodedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupnodedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupnodedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
