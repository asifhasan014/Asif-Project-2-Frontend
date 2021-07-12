import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsfiledirectoryrepositorydetailComponent } from './emsfiledirectoryrepositorydetail.component';

describe('EmsfiledirectoryrepositorydetailComponent', () => {
  let component: EmsfiledirectoryrepositorydetailComponent;
  let fixture: ComponentFixture<EmsfiledirectoryrepositorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsfiledirectoryrepositorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsfiledirectoryrepositorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
