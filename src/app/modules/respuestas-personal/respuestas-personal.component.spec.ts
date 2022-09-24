import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestasPersonalComponent } from './respuestas-personal.component';

describe('PersonalVehiculoComponent', () => {
  let component: RespuestasPersonalComponent;
  let fixture: ComponentFixture<RespuestasPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestasPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestasPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
