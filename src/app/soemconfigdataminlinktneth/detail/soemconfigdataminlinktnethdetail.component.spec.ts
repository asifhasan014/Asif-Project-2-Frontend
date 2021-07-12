import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoemconfigdataminlinktnethdetailComponent } from './soemconfigdataminlinktnethdetail.component';

describe('SoemconfigdataminlinktnethdetailComponent', () => {
  let component: SoemconfigdataminlinktnethdetailComponent;
  let fixture: ComponentFixture<SoemconfigdataminlinktnethdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoemconfigdataminlinktnethdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoemconfigdataminlinktnethdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
