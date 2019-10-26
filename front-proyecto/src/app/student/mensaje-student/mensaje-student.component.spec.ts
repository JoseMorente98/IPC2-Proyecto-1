import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeStudentComponent } from './mensaje-student.component';

describe('MensajeStudentComponent', () => {
  let component: MensajeStudentComponent;
  let fixture: ComponentFixture<MensajeStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
