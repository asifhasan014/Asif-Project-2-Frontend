import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationericssonlandetailComponent } from './utilisationericssonlandetail.component';

describe('UtilisationericssonlandetailComponent', () => {
  let component: UtilisationericssonlandetailComponent;
  let fixture: ComponentFixture<UtilisationericssonlandetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisationericssonlandetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationericssonlandetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
