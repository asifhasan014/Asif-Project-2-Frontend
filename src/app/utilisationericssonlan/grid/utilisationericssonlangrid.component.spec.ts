import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationericssonlangridComponent } from './utilisationericssonlangrid.component';

describe('UtilisationericssonlangridComponent', () => {
  let component: UtilisationericssonlangridComponent;
  let fixture: ComponentFixture<UtilisationericssonlangridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisationericssonlangridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationericssonlangridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
