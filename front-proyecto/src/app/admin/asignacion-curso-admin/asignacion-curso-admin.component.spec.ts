import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionCursoAdminComponent } from './asignacion-curso-admin.component';

describe('AsignacionCursoAdminComponent', () => {
  let component: AsignacionCursoAdminComponent;
  let fixture: ComponentFixture<AsignacionCursoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionCursoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionCursoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
