import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { IsapresModule } from './isapres/isapres.module';
import { ProvidersModule } from './providers/providers.module';
import { UsersModule } from './users/users.module';
import { ManagePlanModule } from './manage-plan/manage-plan.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    IsapresModule,
    ProvidersModule,
    UsersModule,
    ManagePlanModule
  ]
})
export class AdministrationModule { }
