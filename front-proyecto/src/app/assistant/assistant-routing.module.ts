import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAssistantComponent } from './dashboard-assistant/dashboard-assistant.component';
import { AssistantComponent } from './assistant.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AssistantComponent, children: [
    { path: 'dashboard', component: DashboardAssistantComponent},
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
export class AssistantRoutingModule { }
