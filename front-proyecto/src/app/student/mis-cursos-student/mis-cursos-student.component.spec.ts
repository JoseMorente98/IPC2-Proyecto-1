import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCursosStudentComponent } from './mis-cursos-student.component';

describe('MisCursosStudentComponent', () => {
  let component: MisCursosStudentComponent;
  let fixture: ComponentFixture<MisCursosStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCursosStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCursosStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
