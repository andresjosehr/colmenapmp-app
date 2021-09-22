import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePlanComponent } from './manage-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



export function scrollFactory(overlay: Overlay): () => BlockScrollStrategy {
  return () => overlay.scrollStrategies.block();
}




@NgModule({
  declarations: [ManagePlanComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMatFileInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [
    { provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }
  ],
  exports:[ManagePlanComponent]
})
export class ManagePlanModule { }
