import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Performancedatau2000ipgridComponent } from './performancedatau2000ipgrid.component';

describe('Performancedatau2000ipgridComponent', () => {
  let component: Performancedatau2000ipgridComponent;
  let fixture: ComponentFixture<Performancedatau2000ipgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Performancedatau2000ipgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Performancedatau2000ipgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
