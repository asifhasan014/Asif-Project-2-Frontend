import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackuphistorydetailComponent } from './backuphistorydetail.component';

describe('BackuphistorydetailComponent', () => {
  let component: BackuphistorydetailComponent;
  let fixture: ComponentFixture<BackuphistorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackuphistorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackuphistorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
