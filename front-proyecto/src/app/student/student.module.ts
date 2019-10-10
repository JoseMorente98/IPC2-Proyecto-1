import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { StudentRoutingModule } from './student-routing.module';



@NgModule({
  declarations: [StudentComponent, DashboardStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
