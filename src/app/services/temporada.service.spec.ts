import { TestBed } from '@angular/core/testing';

import { TemporadaService } from './temporada.service';

describe('TemporadaService', () => {
  let service: TemporadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
