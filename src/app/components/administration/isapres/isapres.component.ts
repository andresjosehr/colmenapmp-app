import { Component, OnInit } from '@angular/core';
import es from '@angular/common/locales/es';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { IsapresService } from 'src/app/services/isapres/isapres.service';
import { Isapre, IsapresPaginated } from 'src/app/interfaces/isapre/isapre';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-isapres',
  templateUrl: './isapres.component.html',
  styleUrls: ['./isapres.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition( ':enter', [
            style({ transform: "translateY(-50px)", opacity: 0, height: 0, marginBottom: 0 }),
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateY(0px)", opacity: 1, height: 94, marginBottom: 20 }))
          ]
        ),
        transition( ':leave',  [
            style({ transform: "translateY(0px)", opacity: 1, height: 94, marginBottom: 20 }),
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateY(-20px)", opacity: 0, height: 0, marginBottom: 0 }))
          ]
        )
      ]
    )
  ]
})
export class IsapresComponent implements OnInit {

  displayedColumns = ['id', 'logo', 'name', 'ges', "actions"];
  isapres!: IsapresPaginated;
  environment = environment;
  isapreFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  dataSource = new MatTableDataSource<Isapre>();
  hideForm: boolean =true;
  action!: "create" | "edit";
  isapreToEdit!: Isapre;

  constructor(
    private isapresService: IsapresService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    public dialog: MatDialog
  ) {
    registerLocaleData(es);
  }

  ngOnInit(): void {
    
    this.isapreFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      logo: ["", Validators.required],
      ges: ["", Validators.required]
    })

    this.searchFormGroup = this.formBuilder.group({
      term: ["", Validators.required],
      orderBy: ["", Validators.required],
      orderType: ["", Validators.required]
    });

    this.getIsapres()

  }

  getIsapres(){

    const term    = this.searchFormGroup.get("term")?.value
    const orderBy = this.searchFormGroup.get("orderBy")?.value
    const orderType  = this.searchFormGroup.get("orderType")?.value

    console.log(term,
      orderBy,
      orderType)

    this.isapresService.getIsapres(term, orderBy, orderType).subscribe((isapres: IsapresPaginated) =>{
      this.dataSource = new MatTableDataSource(isapres.data);
      this.isapres = isapres;
    })
  }

  saveIsapre(){

    if(this.isapreFormGroup.invalid){
      return this.isapreFormGroup.markAllAsTouched();
    }

    if(this.action=="create"){

      this.isapresService.storeIsapre(this.isapreFormGroup.value).subscribe(response =>{
        this.globalService.openSnackbar(response.message, "green-snackbar");
        this.isapres.data.push(response.response);
        this.dataSource = new MatTableDataSource(this.isapres.data);
        this.isapreFormGroup.reset();
      });

    } else if(this.action='edit'){

      const data = {
        name  : this.isapreFormGroup.get("name")?.value,
        ges   : this.isapreFormGroup.get("ges")?.value as number,
        logo  : this.isapreFormGroup.get("logo")?.value ? this.isapreFormGroup.get("logo")?.value : this.isapreToEdit.logo,
        show_for_seek: 1
      }

      this.isapresService.updateIsapre(data, this.isapreToEdit.id as number).subscribe(response =>{
        this.globalService.openSnackbar(response.message, "green-snackbar");
        this.isapres.data = this.isapres.data.map(isapre => isapre.id == response.response.id ? response.response : isapre );
        this.dataSource = new MatTableDataSource(this.isapres.data);
        this.isapreFormGroup.reset();
        this.hideForm=true;
      });
      
    }
  }
  
  editIsapre(isapre: Isapre){

    this.action="edit";
    this.hideForm=false;
    this.isapreToEdit=isapre

    this.isapreFormGroup = this.formBuilder.group({
      name: [isapre.name, Validators.required],
      ges: [isapre.ges, Validators.required],
      logo: [],
    })
  }


  confirmDelete(isapreID: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: 300,
      data: {
        title: '¿Estas seguro de eliminar este Isapre?',
        option1: 'Cancelar',
        option2: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result.option==2){
        this.isapresService.deleteIsapre(isapreID).subscribe(response =>{

          this.globalService.openSnackbar(response.message, "green-snackbar");
          this.isapres.data = this.isapres.data.filter(isapre => isapre.id!=isapreID)
          this.dataSource = new MatTableDataSource(this.isapres.data);
          
        });
      }

    });
  }


}
