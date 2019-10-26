import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsuarioAdminComponent } from './usuario-admin/usuario-admin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AuxiliarAdminComponent } from './auxiliar-admin/auxiliar-admin.component';
import { StudentAdminComponent } from './student-admin/student-admin.component';
import { CursoComponent } from './curso/curso.component';
import { AsignacionCursoAdminComponent } from './asignacion-curso-admin/asignacion-curso-admin.component';
import { DetailCursoAdminComponent } from './detail-curso-admin/detail-curso-admin.component';
import { TicketAdminComponent } from './ticket-admin/ticket-admin.component';

@NgModule({
  declarations: [
    AdminComponent, 
    DashboardAdminComponent,
    UsuarioAdminComponent,
    AuxiliarAdminComponent,
    StudentAdminComponent,
    CursoComponent,
    AsignacionCursoAdminComponent,
    DetailCursoAdminComponent,
    TicketAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    SimpleNotificationsModule.forRoot(),
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
