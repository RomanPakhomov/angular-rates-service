import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main-form-module/main-form.module').then(m => m.MainFormModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings-form-module/settings-form.module').then(m => m.SettingsFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
