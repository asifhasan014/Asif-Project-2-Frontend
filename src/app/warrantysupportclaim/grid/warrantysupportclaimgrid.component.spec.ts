import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantysupportclaimgridComponent } from './warrantysupportclaimgrid.component';

describe('WarrantysupportclaimgridComponent', () => {
  let component: WarrantysupportclaimgridComponent;
  let fixture: ComponentFixture<WarrantysupportclaimgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantysupportclaimgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantysupportclaimgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
