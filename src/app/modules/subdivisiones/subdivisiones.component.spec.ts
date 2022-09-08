import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionesComponent } from './subdivisiones.component';

describe('SubdivisionesComponent', () => {
  let component: SubdivisionesComponent;
  let fixture: ComponentFixture<SubdivisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
