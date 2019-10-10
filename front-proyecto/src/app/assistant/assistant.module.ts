import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAssistantComponent } from './dashboard-assistant/dashboard-assistant.component';
import { AssistantRoutingModule } from './assistant-routing.module';



@NgModule({
  declarations: [DashboardAssistantComponent,
    DashboardAssistantComponent],
  imports: [
    CommonModule,
    AssistantRoutingModule
  ]
})
export class AssistantModule { }
