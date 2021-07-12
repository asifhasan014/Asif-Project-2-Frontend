import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemalarmdatadetailComponent } from './semalarmdatadetail.component';

describe('SemalarmdatadetailComponent', () => {
  let component: SemalarmdatadetailComponent;
  let fixture: ComponentFixture<SemalarmdatadetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemalarmdatadetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemalarmdatadetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
