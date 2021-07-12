import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackuphistoryComponent } from './backuphistory.component';

describe('BackuphistoryComponent', () => {
  let component: BackuphistoryComponent;
  let fixture: ComponentFixture<BackuphistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackuphistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackuphistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
