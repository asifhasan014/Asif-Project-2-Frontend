import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadgridComponent } from './fileuploadgrid.component';

describe('FileuploadgridComponent', () => {
  let component: FileuploadgridComponent;
  let fixture: ComponentFixture<FileuploadgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
