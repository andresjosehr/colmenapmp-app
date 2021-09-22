import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SplashScreenModule } from './splash-screen/splash-screen.module';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarModule,
    SplashScreenModule,
  ],
  exports:[
    NavbarComponent,
    SplashScreenComponent,
  ]
})
export class GeneralModule { }
