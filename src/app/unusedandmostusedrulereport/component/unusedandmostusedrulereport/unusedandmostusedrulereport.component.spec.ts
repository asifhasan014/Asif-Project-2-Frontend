import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusedandmostusedrulereportComponent } from './unusedandmostusedrulereport.component';

describe('UnusedandmostusedrulereportComponent', () => {
  let component: UnusedandmostusedrulereportComponent;
  let fixture: ComponentFixture<UnusedandmostusedrulereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnusedandmostusedrulereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusedandmostusedrulereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
