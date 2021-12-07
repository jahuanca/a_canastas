import { TestBed } from '@angular/core/testing';

import { SAPService } from './sap.service';

describe('SAPService', () => {
  let service: SAPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SAPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
