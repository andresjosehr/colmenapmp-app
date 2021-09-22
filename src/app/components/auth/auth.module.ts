import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { AuthRoutingModule } from './auth-routing.module';
import { PasswordResetRequestModule } from './password-reset-request/password-reset-request.module';
import { MailConfirmModule } from './mail-confirm/mail-confirm.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule,
    PasswordResetRequestModule,
    MailConfirmModule,
    AuthRoutingModule,
    ResetPasswordModule
  ]
})
export class AuthModule { }
