import { TestBed } from '@angular/core/testing';

import { AsignacionAuxiliarService } from './asignacion-auxiliar.service';

describe('AsignacionAuxiliarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignacionAuxiliarService = TestBed.get(AsignacionAuxiliarService);
    expect(service).toBeTruthy();
  });
});
