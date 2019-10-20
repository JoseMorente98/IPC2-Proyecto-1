import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsuarioAdminComponent } from './usuario-admin/usuario-admin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AdminComponent, 
    DashboardAdminComponent,
    UsuarioAdminComponent
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
