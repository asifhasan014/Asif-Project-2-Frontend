import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationericssonwangridComponent } from './utilisationericssonwangrid.component';

describe('UtilisationericssonwangridComponent', () => {
  let component: UtilisationericssonwangridComponent;
  let fixture: ComponentFixture<UtilisationericssonwangridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisationericssonwangridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationericssonwangridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
