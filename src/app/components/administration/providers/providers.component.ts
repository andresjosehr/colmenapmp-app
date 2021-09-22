import { Component, OnInit } from '@angular/core';
import es from '@angular/common/locales/es';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { Provider, ProvidersPaginated } from 'src/app/interfaces/provider/provider';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { RegionsService } from 'src/app/services/regions/regions.service';
import { Region } from 'src/app/interfaces/region/region';
import { Regions } from 'src/app/interfaces/regions/regions';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
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
export class ProvidersComponent implements OnInit {

  displayedColumns = ['id', 'region', 'name', "actions"];
  providers!: ProvidersPaginated;
  environment = environment;
  providerFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  dataSource = new MatTableDataSource<Provider>();
  hideForm: boolean =true;
  action!: "create" | "edit";
  regions!: Array<Regions>
  providerToEdit!: Provider;

  constructor(
    private providersService: ProvidersService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    public dialog: MatDialog,
    private regionsService: RegionsService
  ) {
    registerLocaleData(es);
  }

  ngOnInit(): void {

    this.regionsService.getAllRegions().subscribe((response: Array<Region>) => this.regions=response )
    
    this.providerFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      region_id: ["", Validators.required]
    })

    this.searchFormGroup = this.formBuilder.group({
      term: ["", Validators.required],
      orderBy: ["", Validators.required],
      orderType: ["", Validators.required]
    });

    this.getProviders()

  }

  getProviders(){

    const term    = this.searchFormGroup.get("term")?.value
    const orderBy = this.searchFormGroup.get("orderBy")?.value
    const orderType  = this.searchFormGroup.get("orderType")?.value

    console.log(term,
      orderBy,
      orderType)

    this.providersService.getProviders(term, orderBy, orderType).subscribe((providers: ProvidersPaginated) =>{
      this.dataSource = new MatTableDataSource(providers.data);
      this.providers = providers;
    })
  }

  saveProvider(){

    if(this.providerFormGroup.invalid){
      return this.providerFormGroup.markAllAsTouched();
    }

    if(this.action=="create"){

      this.providersService.storeProvider(this.providerFormGroup.value).subscribe(response =>{
        this.globalService.openSnackbar(response.message, "green-snackbar");
        this.providers.data.push(response.response);
        this.dataSource = new MatTableDataSource(this.providers.data);
        this.providerFormGroup.reset();
      });

    } else if(this.action='edit'){

      this.providersService.updateProvider(this.providerFormGroup.value, this.providerToEdit.id as number).subscribe(response =>{
        this.globalService.openSnackbar(response.message, "green-snackbar");
        this.providers.data = this.providers.data.map(provider => provider.id == response.response.id ? response.response : provider );
        this.dataSource = new MatTableDataSource(this.providers.data);
        this.providerFormGroup.reset();
        this.hideForm=true;
      });
      
    }
  }
  
  editProvider(provider: Provider){

    this.action="edit";
    this.hideForm=false;
    this.providerToEdit=provider

    this.providerFormGroup = this.formBuilder.group({
      name: [provider.name, Validators.required],
      region_id: [provider.region_id, Validators.required],
      logo: [],
    })
  }


  confirmDelete(providerID: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: 300,
      data: {
        title: '¿Estas seguro de eliminar este proveedor?',
        option1: 'Cancelar',
        option2: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result.option==2){
        this.providersService.deleteProvider(providerID).subscribe(response =>{

          this.globalService.openSnackbar(response.message, "green-snackbar");
          this.providers.data = this.providers.data.filter(provider => provider.id!=providerID)
          this.dataSource = new MatTableDataSource(this.providers.data);
          
        });
      }

    });
  }

  getProviderRegion(provider: Provider): string {
    const region = this.regions.filter(region => region.id==provider.region_id)[0]
    const nombre = region ? region.name : "";
    return nombre;
  }

  getProviderCode(provider: Provider): string {
    const region = this.regions.filter(region => region.id==provider.region_id)[0];
    const code = region ? region.code : "";
    return code
  }


}
