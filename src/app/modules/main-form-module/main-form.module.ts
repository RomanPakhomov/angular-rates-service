import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFormComponent } from './components/main-form-component/main-form.component';
import { MainFormRoutingModule } from './main-form-routing.module';
import { UserListComponent } from './components/user-list-component/user-list.component';
import { MainFormPageComponent } from './components/main-form-page/main-form-page.component';

@NgModule({
  declarations: [
    MainFormComponent,
    UserListComponent,
    MainFormPageComponent
  ],
  imports: [
    CommonModule,
    MainFormRoutingModule
  ]
})
export class MainFormModule { }
