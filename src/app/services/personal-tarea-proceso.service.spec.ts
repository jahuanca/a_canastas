import { TestBed } from '@angular/core/testing';

import { PersonalTareaProcesoService } from './personal-tarea-proceso.service';

describe('PersonalTareaProcesoService', () => {
  let service: PersonalTareaProcesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalTareaProcesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
