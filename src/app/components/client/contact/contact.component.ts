import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Isapre } from 'src/app/interfaces/isapre/isapre';
import { IsapresService } from 'src/app/services/isapres/isapres.service';
import { SeekerService } from 'src/app/services/seeker/seeker.service';
import { ConfirmationDialogComponent } from '../seeker/confirmation-dialog/confirmation-dialog.component';
import { ContactFormDialogComponent } from '../seeker/contact-form-dialog/contact-form-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  options: any = {
    path: 'assets/lotties/animation.json',
  }; 

  contactFormGroup!: FormGroup
  isapres!: Array<Isapre>;
  
  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private seekerService: SeekerService,
    private isapresService: IsapresService,
  ) { }

  ngOnInit(): void {
    this.isapresService.getIsapresForContact().subscribe((isapres: any) =>this.isapres = isapres)

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
    this.seekerService.makeContact(this.contactFormGroup.value, null, null, 0).subscribe(response =>{
      
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
