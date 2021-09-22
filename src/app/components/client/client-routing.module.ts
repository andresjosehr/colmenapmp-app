import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeekerComponent } from './seeker/seeker.component';

const routes: Routes = [
  {
      path     : '',
      component: SeekerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
