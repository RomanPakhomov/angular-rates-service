import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFormComponent } from './components/mainFormComponent/main-form.component';
import { UserListComponent } from './components/userListComponent/user-list.component';



@NgModule({
  declarations: [MainFormComponent, UserListComponent],
  imports: [
    CommonModule
  ]
})
export class MainFormModule { }
