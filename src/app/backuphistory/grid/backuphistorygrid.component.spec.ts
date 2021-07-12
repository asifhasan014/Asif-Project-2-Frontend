import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackuphistorygridComponent } from './backuphistorygrid.component';

describe('BackuphistorygridComponent', () => {
  let component: BackuphistorygridComponent;
  let fixture: ComponentFixture<BackuphistorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackuphistorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackuphistorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
