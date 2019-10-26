import { TestBed } from '@angular/core/testing';

import { AsignacionEstudianteService } from './asignacion-estudiante.service';

describe('AsignacionEstudianteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignacionEstudianteService = TestBed.get(AsignacionEstudianteService);
    expect(service).toBeTruthy();
  });
});
