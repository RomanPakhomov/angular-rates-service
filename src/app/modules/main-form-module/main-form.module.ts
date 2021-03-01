import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFormComponent } from './components/main-form-component/main-form.component';
import { MainFormRoutingModule } from './main-form-routing.module';
import { UserListComponent } from './components/user-list-component/user-list.component';
import { MainFormPageComponent } from './components/main-form-page/main-form-page.component';
import { PipeOptionsSumm } from 'src/app/pipes/pipe-options-summ.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MainFormComponent,
    UserListComponent,
    MainFormPageComponent,
    PipeOptionsSumm,
  ],
  imports: [
    CommonModule,
    MainFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class MainFormModule { }
