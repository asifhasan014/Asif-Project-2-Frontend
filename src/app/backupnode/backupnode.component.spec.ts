import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupnodeComponent } from './backupnode.component';

describe('BackupnodeComponent', () => {
  let component: BackupnodeComponent;
  let fixture: ComponentFixture<BackupnodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupnodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
