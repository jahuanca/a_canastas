import { TestBed } from '@angular/core/testing';

import { PersonalAptoTemporadaService } from './personal-apto-temporada.service';

describe('PersonalAptoTemporadaService', () => {
  let service: PersonalAptoTemporadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalAptoTemporadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
