import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationericssonwandetailComponent } from './utilisationericssonwandetail.component';

describe('UtilisationericssonwandetailComponent', () => {
  let component: UtilisationericssonwandetailComponent;
  let fixture: ComponentFixture<UtilisationericssonwandetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisationericssonwandetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationericssonwandetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
