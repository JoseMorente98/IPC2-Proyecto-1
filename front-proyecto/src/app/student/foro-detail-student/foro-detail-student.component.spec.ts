import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoDetailStudentComponent } from './foro-detail-student.component';

describe('ForoDetailStudentComponent', () => {
  let component: ForoDetailStudentComponent;
  let fixture: ComponentFixture<ForoDetailStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoDetailStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoDetailStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
