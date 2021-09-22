import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  public path: string = "";

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private router: Router,
    public locaton: Location
  ) { 
    this.router.events.subscribe((val) => {
      this.path = locaton.path().split(";")[0].split("?")[0];
    });

  }

  
  public openSnackbar(message: string, htmlClass="green-snackbar", action = '', duration = 3000) {
      this.zone.run(() => {
          this.snackBar.open(message, action, { 
            duration,
            panelClass: [htmlClass],
            verticalPosition: "top",
            horizontalPosition: "center"});

      });
  }

  getBackEndValidationErrors(errorsFromBackend: any){
          
    const errors: any = [];
    if (errorsFromBackend.errorType='validation') {
        for (const property in errorsFromBackend.response) {
            errors[property] = [];
            errors[property] = errorsFromBackend.response[property].map((error: any) => error);
        }
        
    }

    return errors;
  };


  catchHttpError(err: any): void{
    const message = err.error ? err.error.message : '';
    this.openSnackbar(message, "red-snackbar");
  }


}
