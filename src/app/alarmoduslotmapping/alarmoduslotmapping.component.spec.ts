import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmoduslotmappingComponent } from './alarmoduslotmapping.component';

describe('AlarmoduslotmappingComponent', () => {
  let component: AlarmoduslotmappingComponent;
  let fixture: ComponentFixture<AlarmoduslotmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmoduslotmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmoduslotmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
