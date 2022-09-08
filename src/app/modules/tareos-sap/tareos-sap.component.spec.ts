import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareosSapComponent } from './tareos-sap.component';

describe('TareosSapComponent', () => {
  let component: TareosSapComponent;
  let fixture: ComponentFixture<TareosSapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareosSapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareosSapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
