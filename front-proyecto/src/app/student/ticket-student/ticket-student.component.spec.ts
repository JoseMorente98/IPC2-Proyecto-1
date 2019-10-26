import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStudentComponent } from './ticket-student.component';

describe('TicketStudentComponent', () => {
  let component: TicketStudentComponent;
  let fixture: ComponentFixture<TicketStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
