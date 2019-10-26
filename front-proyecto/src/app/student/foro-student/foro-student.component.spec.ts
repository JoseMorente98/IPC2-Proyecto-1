import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoStudentComponent } from './foro-student.component';

describe('ForoStudentComponent', () => {
  let component: ForoStudentComponent;
  let fixture: ComponentFixture<ForoStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
