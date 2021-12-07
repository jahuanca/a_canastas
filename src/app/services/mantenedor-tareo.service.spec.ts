import { TestBed } from '@angular/core/testing';

import { MantenedorTareoService } from './mantenedor-tareo.service';

describe('MantenedorTareoService', () => {
  let service: MantenedorTareoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorTareoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
