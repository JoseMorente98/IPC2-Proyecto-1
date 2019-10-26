import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { StudentRoutingModule } from './student-routing.module';
import { CursosStudentComponent } from './cursos-student/cursos-student.component';
import { MisCursosStudentComponent } from './mis-cursos-student/mis-cursos-student.component';
import { MensajeStudentComponent } from './mensaje-student/mensaje-student.component';
import { ForoStudentComponent } from './foro-student/foro-student.component';
import { ForoDetailStudentComponent } from './foro-detail-student/foro-detail-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TicketStudentComponent } from './ticket-student/ticket-student.component';



@NgModule({
  declarations: [
    StudentComponent, 
    DashboardStudentComponent, 
    CursosStudentComponent, 
    MisCursosStudentComponent, 
    MensajeStudentComponent, 
    ForoStudentComponent, 
    ForoDetailStudentComponent, TicketStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class StudentModule { }
