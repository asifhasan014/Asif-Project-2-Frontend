import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationrepositorydetailComponent } from './informationrepositorydetail.component';

describe('InformationrepositorydetailComponent', () => {
  let component: InformationrepositorydetailComponent;
  let fixture: ComponentFixture<InformationrepositorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationrepositorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationrepositorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
