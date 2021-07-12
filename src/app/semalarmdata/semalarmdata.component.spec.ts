import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemalarmdataComponent } from './semalarmdata.component';

describe('SemalarmdataComponent', () => {
  let component: SemalarmdataComponent;
  let fixture: ComponentFixture<SemalarmdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemalarmdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemalarmdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
