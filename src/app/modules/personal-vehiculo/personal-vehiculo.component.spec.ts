import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalVehiculoComponent } from './personal-vehiculo.component';

describe('PersonalVehiculoComponent', () => {
  let component: PersonalVehiculoComponent;
  let fixture: ComponentFixture<PersonalVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
