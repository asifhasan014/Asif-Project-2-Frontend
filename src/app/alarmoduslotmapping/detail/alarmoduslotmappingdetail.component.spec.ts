import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmoduslotmappingdetailComponent } from './alarmoduslotmappingdetail.component';

describe('AlarmoduslotmappingdetailComponent', () => {
  let component: AlarmoduslotmappingdetailComponent;
  let fixture: ComponentFixture<AlarmoduslotmappingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmoduslotmappingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmoduslotmappingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
