import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupnodegridComponent } from './backupnodegrid.component';

describe('BackupnodegridComponent', () => {
  let component: BackupnodegridComponent;
  let fixture: ComponentFixture<BackupnodegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupnodegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupnodegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
