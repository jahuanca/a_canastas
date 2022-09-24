import { TestBed } from '@angular/core/testing';

import { RespuestasPersonalService } from './respuestas-personal.service';

describe('RespuestasPersonalService', () => {
  let service: RespuestasPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestasPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
