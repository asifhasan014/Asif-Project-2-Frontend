import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpoweritemwisewarrantygridComponent } from './dcpoweritemwisewarrantygrid.component';

describe('DcpoweritemwisewarrantygridComponent', () => {
  let component: DcpoweritemwisewarrantygridComponent;
  let fixture: ComponentFixture<DcpoweritemwisewarrantygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpoweritemwisewarrantygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpoweritemwisewarrantygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
