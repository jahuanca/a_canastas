import { TestBed } from '@angular/core/testing';

import { EncuestaOpcionService } from './encuesta-opcion.service';

describe('EncuestaOpcionService', () => {
  let service: EncuestaOpcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuestaOpcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
