import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationericssonwanComponent } from './utilisationericssonwan.component';

describe('UtilisationericssonwanComponent', () => {
  let component: UtilisationericssonwanComponent;
  let fixture: ComponentFixture<UtilisationericssonwanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisationericssonwanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationericssonwanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
