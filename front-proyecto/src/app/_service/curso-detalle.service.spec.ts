import { TestBed } from '@angular/core/testing';

import { CursoDetalleService } from './curso-detalle.service';

describe('CursoDetalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoDetalleService = TestBed.get(CursoDetalleService);
    expect(service).toBeTruthy();
  });
});
