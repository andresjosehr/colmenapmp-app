import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MailConfirmComponent } from './mail-confirm/mail-confirm.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path      : 'ingresar',
    component : LoginComponent
  },
  {
    path      : 'solicitud-cambio-password',
    component : PasswordResetRequestComponent
  },
  {
    path      : 'confirmacion-email',
    component : MailConfirmComponent
  },
  {
    path      : 'cambiar-password',
    component : ResetPasswordComponent
  },
  {
    path      : '**',
    redirectTo: '/buscar-planes'
  },
  {
    path      : '',
    redirectTo: '/buscar-planes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
