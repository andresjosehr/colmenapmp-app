import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeekerComponent } from './seeker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PdfPlanDialogComponent } from './pdf-plan-dialog/pdf-plan-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactFormDialogComponent } from './contact-form-dialog/contact-form-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgTippyModule } from 'angular-tippy';
import {MatBadgeModule} from '@angular/material/badge';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularTawkModule } from 'angular-tawk';
import { ContactFormDialogModule } from './contact-form-dialog/contact-form-dialog.module';




// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}





@NgModule({
  declarations: [SeekerComponent, PdfPlanDialogComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    PdfViewerModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    NgTippyModule,
    MatCheckboxModule,
    MatBadgeModule,
    NgxPaginationModule,
    FontAwesomeModule,
    AngularTawkModule,
    ContactFormDialogModule,
    NgxPaginationModule,

    LottieModule.forRoot({ player: playerFactory }),

  ],
})
export class SeekerModule { }
