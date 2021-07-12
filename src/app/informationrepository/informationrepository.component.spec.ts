import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationrepositoryComponent } from './informationrepository.component';

describe('InformationrepositoryComponent', () => {
  let component: InformationrepositoryComponent;
  let fixture: ComponentFixture<InformationrepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationrepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationrepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
