import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAssistantComponent } from './dashboard-assistant/dashboard-assistant.component';
import { AssistantComponent } from './assistant.component';
import { MensajeAssistantComponent } from './mensaje-assistant/mensaje-assistant.component';
import { CursosAssistantComponent } from './cursos-assistant/cursos-assistant.component';
import { ForoAssistantComponent } from './foro-assistant/foro-assistant.component';
import { ForoDetailAssistantComponent } from './foro-detail-assistant/foro-detail-assistant.component';
import { ActividadAssistantComponent } from './actividad-assistant/actividad-assistant.component';
import { EvaluacionAssistantComponent } from './evaluacion-assistant/evaluacion-assistant.component';
import { EvaluacionDetalleAssistantComponent } from './evaluacion-detalle-assistant/evaluacion-detalle-assistant.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AssistantComponent, children: [
    { path: 'dashboard', component: DashboardAssistantComponent},
    { path: 'mensaje', component: MensajeAssistantComponent},
    { path: 'cursos', component: CursosAssistantComponent},
    { path: 'foro/:id', component: ForoAssistantComponent},
    { path: 'foro/detail/:id', component: ForoDetailAssistantComponent},
    { path: 'actividad/:id', component: ActividadAssistantComponent},
    { path: 'evaluacion/:id', component: EvaluacionAssistantComponent},
    { path: 'evaluacion/detail/:id', component: EvaluacionDetalleAssistantComponent},
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
