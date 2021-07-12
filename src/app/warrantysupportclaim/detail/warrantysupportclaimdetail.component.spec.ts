import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantysupportclaimdetailComponent } from './warrantysupportclaimdetail.component';

describe('WarrantysupportclaimdetailComponent', () => {
  let component: WarrantysupportclaimdetailComponent;
  let fixture: ComponentFixture<WarrantysupportclaimdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantysupportclaimdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantysupportclaimdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
