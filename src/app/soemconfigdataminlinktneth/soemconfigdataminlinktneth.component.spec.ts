import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoemconfigdataminlinktnethComponent } from './soemconfigdataminlinktneth.component';

describe('SoemconfigdataminlinktnethComponent', () => {
  let component: SoemconfigdataminlinktnethComponent;
  let fixture: ComponentFixture<SoemconfigdataminlinktnethComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoemconfigdataminlinktnethComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoemconfigdataminlinktnethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
