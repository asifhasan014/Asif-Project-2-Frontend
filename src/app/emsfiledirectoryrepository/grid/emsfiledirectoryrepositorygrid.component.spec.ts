import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsfiledirectoryrepositorygridComponent } from './emsfiledirectoryrepositorygrid.component';

describe('EmsfiledirectoryrepositorygridComponent', () => {
  let component: EmsfiledirectoryrepositorygridComponent;
  let fixture: ComponentFixture<EmsfiledirectoryrepositorygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsfiledirectoryrepositorygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsfiledirectoryrepositorygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
