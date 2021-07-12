import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantysupportclaimComponent } from './warrantysupportclaim.component';

describe('WarrantysupportclaimComponent', () => {
  let component: WarrantysupportclaimComponent;
  let fixture: ComponentFixture<WarrantysupportclaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantysupportclaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantysupportclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
