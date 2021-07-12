import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemalarmdatagridComponent } from './semalarmdatagrid.component';

describe('SemalarmdatagridComponent', () => {
  let component: SemalarmdatagridComponent;
  let fixture: ComponentFixture<SemalarmdatagridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemalarmdatagridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemalarmdatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
