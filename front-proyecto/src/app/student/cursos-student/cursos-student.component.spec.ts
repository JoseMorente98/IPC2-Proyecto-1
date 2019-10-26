import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosStudentComponent } from './cursos-student.component';

describe('CursosStudentComponent', () => {
  let component: CursosStudentComponent;
  let fixture: ComponentFixture<CursosStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
