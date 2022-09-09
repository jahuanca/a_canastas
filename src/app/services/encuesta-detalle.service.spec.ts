import { TestBed } from '@angular/core/testing';

import { EncuestaDetalleService } from './encuesta-detalle.service';

describe('EncuestaDetalleService', () => {
  let service: EncuestaDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuestaDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
