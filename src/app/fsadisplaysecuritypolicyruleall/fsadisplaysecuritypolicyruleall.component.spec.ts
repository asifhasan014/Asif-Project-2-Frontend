import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsadisplaysecuritypolicyruleallComponent } from './fsadisplaysecuritypolicyruleall.component';

describe('FsadisplaysecuritypolicyruleallComponent', () => {
  let component: FsadisplaysecuritypolicyruleallComponent;
  let fixture: ComponentFixture<FsadisplaysecuritypolicyruleallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsadisplaysecuritypolicyruleallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsadisplaysecuritypolicyruleallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
