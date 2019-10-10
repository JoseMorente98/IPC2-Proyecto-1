import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { StudentComponent } from './student.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: StudentComponent, children: [
    { path: 'dashboard', component: DashboardStudentComponent},
    /*{ path: 'producto', component: ProductoAdminComponent, canActivate: [AuthGuard] },
    { path: 'proveedor', component: ProveedorAdminComponent, canActivate: [AuthGuard] },
    { path: 'usuario', component: UsuarioAdminComponent, canActivate: [AuthGuard] },
    { path: 'reporte', component:  ReportesAdminComponent, canActivate: [AuthGuard] },
    { path: 'reporte/:id', component:  ReportesAdminComponent, canActivate: [AuthGuard] },/** */
    //{ path: 'category', component: CategoryComponent },
    //{ path: 'subcategory', component: SubcategoryComponent },
   // { path: 'product', component: ProductComponent },
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
