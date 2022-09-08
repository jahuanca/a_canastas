import { TestBed } from '@angular/core/testing';

import { PersonalEmpresaService } from './personal-empresa.service';

describe('PersonalEmpresaService', () => {
  let service: PersonalEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
