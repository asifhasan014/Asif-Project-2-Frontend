import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationrepositorygridComponent } from './informationrepositorygrid.component';

describe('InformationrepositorygridComponent', () => {
  let component: InformationrepositorygridComponent;
  let fixture: ComponentFixture<InformationrepositorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationrepositorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationrepositorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
