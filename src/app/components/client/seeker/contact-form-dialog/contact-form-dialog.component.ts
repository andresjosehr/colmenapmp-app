import { AnimationOptions } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Burden } from 'src/app/interfaces/burden/burden';
import { Isapre } from 'src/app/interfaces/isapre/isapre';
import { Plan } from 'src/app/interfaces/plan/plan';
import { IsapresService } from 'src/app/services/isapres/isapres.service';
import { SeekerService } from 'src/app/services/seeker/seeker.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contact-form-dialog',
  templateUrl: './contact-form-dialog.component.html',
  styleUrls: ['./contact-form-dialog.component.scss']
})
export class ContactFormDialogComponent implements OnInit {

   options: any = {
    path: 'assets/lotties/animation.json',
  }; 
  isapres!: Array<Isapre>;

  contactFormGroup!: FormGroup
  
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {plan: Plan, isapres: Array<Isapre>, userProfile: any, coupleProfile: any, burdens: Array<Burden>},
    public formBuilder: FormBuilder,
    private isapresService: IsapresService,
    private seekerService: SeekerService
  ) { }

  ngOnInit(): void {
    this.contactFormGroup = this.formBuilder.group({
      full_name: ["", Validators.required],
      rut: ["", [Validators.required, Validators.pattern(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      preferent_contact_time_start: [""],
      preferent_contact_time_end: [""],
      isapre_id: [1, [Validators.required]],
      message: [""]
    });
  }

  register(){

    if(this.contactFormGroup.invalid){
      this.contactFormGroup.markAllAsTouched();    
      return;  
    }
    this.seekerService.makeContact({...this.contactFormGroup.value, ...this.data.userProfile}, this.data.burdens, this.data.coupleProfile, this.data.plan.id).subscribe(response =>{
      
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
        
    })

  }

  // openConfirmationDialog(){
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

}
