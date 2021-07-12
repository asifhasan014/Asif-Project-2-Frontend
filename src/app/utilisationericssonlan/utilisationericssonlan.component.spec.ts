import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationericssonlanComponent } from './utilisationericssonlan.component';

describe('UtilisationericssonlanComponent', () => {
  let component: UtilisationericssonlanComponent;
  let fixture: ComponentFixture<UtilisationericssonlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisationericssonlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationericssonlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
