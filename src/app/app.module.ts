import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralModule } from './components/general/general.module';
import { ClientModule } from './components/client/client.module';
import { SplashScreenStateService } from './services/general/splash-scree/splash-screen-state.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginModule } from './components/auth/login/login.module';
import { InterceptorService } from './services/http-interceptor/HttpInterceptor.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConfirmDialogComponent } from './components/general/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from './components/general/confirm-dialog/confirm-dialog.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,

    /* App Modules */

    GeneralModule,
    ClientModule,
    LoginModule,
    ConfirmDialogModule,
    FontAwesomeModule,
    NgxPaginationModule,
    MatAutocompleteModule


  ],
  providers: [
    SplashScreenStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
