import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirComponent } from './elegir.component';

describe('ElegirComponent', () => {
  let component: ElegirComponent;
  let fixture: ComponentFixture<ElegirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
