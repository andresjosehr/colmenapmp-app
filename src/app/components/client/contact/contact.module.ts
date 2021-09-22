import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormDialogModule } from '../seeker/contact-form-dialog/contact-form-dialog.module';
import { ContactComponent } from './contact.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../seeker/seeker.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';



const routes: Routes = [
  {
      path     : '',
      component: ContactComponent
  },
];



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactFormDialogModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    RouterModule.forChild(routes),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ContactModule { }
