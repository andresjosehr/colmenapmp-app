import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PDFProgressData } from 'ng2-pdf-viewer';
import { ContactFormDialogComponent } from '../contact-form-dialog/contact-form-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Isapre } from 'src/app/interfaces/isapre/isapre';
import { Plan } from 'src/app/interfaces/plan/plan';
import { Burden } from 'src/app/interfaces/burden/burden';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-pdf-plan-dialog',
  templateUrl: './pdf-plan-dialog.component.html',
  styleUrls: ['./pdf-plan-dialog.component.scss']
})
export class PdfPlanDialogComponent implements OnInit {

  doc!: any;
  PDFrendered: boolean = false;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {plan: Plan, isapres: Array<Isapre>,userProfile: any, coupleProfile:any, burdens: Array<Burden>},
    private sanitizer: DomSanitizer
  ) {
    this.doc=this.transform(`${environment.assetsServerUrl}/storage/pdf/${data.plan.code}.pdf`)
    console.log(this.doc)

  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
  }

  onPDFRendered(progressData: any){
    this.PDFrendered = true;
  }


  getPlan(){
    const dialogRef = this.dialog.open(ContactFormDialogComponent, {
      width: "1000px",
      height: "500px",
      panelClass: 'contact-form-dialog',
      data: {
        plan: this.data.plan,
        userProfile: this.data.userProfile,
        coupleProfile: this.data.coupleProfile,
        isapres: this.data.isapres,
        burdens: this.data.burdens,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
}

}

