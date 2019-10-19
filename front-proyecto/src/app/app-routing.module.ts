import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes:Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: 'estudiante', loadChildren: './student/student.module#StudentModule'},
  { path: 'auxiliar', loadChildren: './assistant/assistant.module#AssistantModule'},
  { path: '**', pathMatch: 'full', redirectTo:'login'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
