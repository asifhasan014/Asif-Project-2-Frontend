import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsadisplaysecuritypolicyruleallgridComponent } from './fsadisplaysecuritypolicyruleallgrid.component';

describe('FsadisplaysecuritypolicyruleallgridComponent', () => {
  let component: FsadisplaysecuritypolicyruleallgridComponent;
  let fixture: ComponentFixture<FsadisplaysecuritypolicyruleallgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsadisplaysecuritypolicyruleallgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsadisplaysecuritypolicyruleallgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
