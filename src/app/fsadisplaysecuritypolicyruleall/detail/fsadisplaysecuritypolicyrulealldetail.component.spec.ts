import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsadisplaysecuritypolicyrulealldetailComponent } from './fsadisplaysecuritypolicyrulealldetail.component';

describe('FsadisplaysecuritypolicyrulealldetailComponent', () => {
  let component: FsadisplaysecuritypolicyrulealldetailComponent;
  let fixture: ComponentFixture<FsadisplaysecuritypolicyrulealldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsadisplaysecuritypolicyrulealldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsadisplaysecuritypolicyrulealldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
