import { TestBed } from '@angular/core/testing';

import { PersonalVehiculoService } from './personal-vehiculo.service';

describe('PersonalVehiculoService', () => {
  let service: PersonalVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
