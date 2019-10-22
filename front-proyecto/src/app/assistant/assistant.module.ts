import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAssistantComponent } from './dashboard-assistant/dashboard-assistant.component';
import { AssistantRoutingModule } from './assistant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AssistantComponent } from './assistant.component';
import { MensajeAssistantComponent } from './mensaje-assistant/mensaje-assistant.component';
import { CursosAssistantComponent } from './cursos-assistant/cursos-assistant.component';
import { ForoAssistantComponent } from './foro-assistant/foro-assistant.component';

@NgModule({
  declarations: [
    DashboardAssistantComponent,
    AssistantComponent,
    MensajeAssistantComponent,
    CursosAssistantComponent,
    ForoAssistantComponent
  ],
  imports: [
    CommonModule,
    AssistantRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class AssistantModule { }
