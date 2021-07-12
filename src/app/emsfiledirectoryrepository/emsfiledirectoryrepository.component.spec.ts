import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsfiledirectoryrepositoryComponent } from './emsfiledirectoryrepository.component';

describe('EmsfiledirectoryrepositoryComponent', () => {
  let component: EmsfiledirectoryrepositoryComponent;
  let fixture: ComponentFixture<EmsfiledirectoryrepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsfiledirectoryrepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsfiledirectoryrepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
