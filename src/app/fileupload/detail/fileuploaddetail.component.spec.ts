import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploaddetailComponent } from './fileuploaddetail.component';

describe('FileuploaddetailComponent', () => {
  let component: FileuploaddetailComponent;
  let fixture: ComponentFixture<FileuploaddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploaddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploaddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
