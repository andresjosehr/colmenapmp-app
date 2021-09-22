import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path      : 'buscar-planes',
    loadChildren: () => import('./components/client/client.module').then(m => m.ClientModule),
  },
  {
    path      : 'contacto',
    loadChildren: () => import('./components/client/contact/contact.module').then(m => m.ContactModule),
  },
  {
    path      : 'administracion',
    loadChildren: () => import('./components/administration/administration.module').then(m => m.AdministrationModule),
    canActivate : [ AuthGuard ]
  },
  {
    path      : '',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
