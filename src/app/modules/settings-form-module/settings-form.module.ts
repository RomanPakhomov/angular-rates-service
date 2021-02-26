import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsFormComponent } from './components/settings-form-component/settings-form.component';
import { SettingsFormPageComponent } from './components/settings-form-page/settings-form-page.component';
import { SettingsFormRoutingModule } from './settings-form-routing.module';

@NgModule({
  declarations: [
    SettingsFormComponent,
    SettingsFormPageComponent
  ],
  imports: [
    CommonModule,
    SettingsFormRoutingModule
  ]
})
export class SettingsFormModule { }
