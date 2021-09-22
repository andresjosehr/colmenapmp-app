import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeekerModule } from './seeker/seeker.module';
import { ClientRoutingModule } from './client-routing.module';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SeekerModule
  ]
})
export class ClientModule { }
