import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Performancedatau2000ipComponent } from './performancedatau2000ip.component';

describe('Performancedatau2000ipComponent', () => {
  let component: Performancedatau2000ipComponent;
  let fixture: ComponentFixture<Performancedatau2000ipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Performancedatau2000ipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Performancedatau2000ipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
