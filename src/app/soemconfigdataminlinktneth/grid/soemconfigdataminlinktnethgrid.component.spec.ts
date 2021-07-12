import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoemconfigdataminlinktnethgridComponent } from './soemconfigdataminlinktnethgrid.component';

describe('SoemconfigdataminlinktnethgridComponent', () => {
  let component: SoemconfigdataminlinktnethgridComponent;
  let fixture: ComponentFixture<SoemconfigdataminlinktnethgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoemconfigdataminlinktnethgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoemconfigdataminlinktnethgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
