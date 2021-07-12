import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpowervendorgridComponent } from './dcpowervendorgrid.component';

describe('DcpowervendorgridComponent', () => {
  let component: DcpowervendorgridComponent;
  let fixture: ComponentFixture<DcpowervendorgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpowervendorgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpowervendorgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
