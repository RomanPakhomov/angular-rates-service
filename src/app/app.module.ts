import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OptionService } from './services/option.service';
import { UserService } from './services/user.service';
import { OptionEffects } from './store/effects/option.effects';
import { UserEffects } from './store/effects/user.effects';
import { appReducers } from './store/reducers/app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3000, preventDuplicates: true }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects, OptionEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [UserService, OptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
