import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { IsapresComponent } from './isapres/isapres.component';
import { ProvidersComponent } from './providers/providers.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path      : 'clientes',
    component : ClientsComponent
  },
  {
    path      : 'isapres',
    component : IsapresComponent
  },
  {
    path      : 'proveedores',
    component : ProvidersComponent
  },
  {
    path      : 'usuarios',
    component : UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
