import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormDialogComponent } from './contact-form-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../seeker.module';



@NgModule({
  declarations: [ContactFormDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports:[ContactFormDialogComponent]
})
export class ContactFormDialogModule { }
