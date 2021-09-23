import { LabelType, Options } from '@angular-slider/ngx-slider';
import es from '@angular/common/locales/es';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { registerLocaleData, TitleCasePipe } from '@angular/common';
import { formatNumber } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PdfPlanDialogComponent } from './pdf-plan-dialog/pdf-plan-dialog.component';
import { ContactFormDialogComponent } from './contact-form-dialog/contact-form-dialog.component';
import { SeekerService } from 'src/app/services/seeker/seeker.service';
import { Plan, PlanPaginated } from 'src/app/interfaces/plan/plan';
import { environment } from 'src/environments/environment';
import { Region } from 'src/app/interfaces/region/region';
import { Provider } from 'src/app/interfaces/provider/provider';
import { PlanType } from 'src/app/interfaces/planType/plan-type';
import { Isapre } from 'src/app/interfaces/isapre/isapre';
import { SuscriptionPrice } from 'src/app/interfaces/suscriptionPrice/suscription-price';
import { LoginService } from 'src/app/services/login/login.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SplashScreenStateService } from 'src/app/services/general/splash-scree/splash-screen-state.service';
import tippy from 'tippy.js';
import { AngularTawkComponent } from 'angular-tawk';
import { faCoffee, faVirus, faFileInvoiceDollar, faGlasses, faStethoscope, faTooth, faPills, faBrain, faBone, faPhone, faPlane, faPiggyBank, faSyringe, faBicycle, faRunning, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from 'src/app/services/global/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { Collection } from 'ngx-pagination/dist/paginate.pipe';
import { ManagePlanComponent } from '../../administration/manage-plan/manage-plan.component';




@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss'],
  animations: [
    trigger('planAnimations', [
      
      transition('* => in', [
        query('.plan-animation', [
          state('in', style({ opacity: 1, transform: 'none' })),
          state('out', style({ opacity: 0, transform: 'translateY(-100px)' })),
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-40, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ]),
      transition('* => out', [
        query('.plan-animation', [
          state('in', style({ opacity: 1, transform: 'none' })),
          state('out', style({ opacity: 0, transform: 'translateY(-100px)' })),
          style({opacity: 1, transform: 'translateY(0px)'}),
          stagger(-20, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(-100px)' }))
          ])
        ])
      ])
    ]),
    trigger(
      'inOutAnimation', 
      [
        transition( ':enter', [
            style({ transform: "translateX(-50px)", opacity: 0, height: 0, marginBottom: 0 }),
            animate('200ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateX(0px)", opacity: 1, height: 26, marginBottom: 10 }))
          ]
        ),
        transition( ':leave',  [
            style({ transform: "translateX(0px)", opacity: 1, height: 26, marginBottom: 10 }),
            animate('200ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateX(-20px)", opacity: 0, height: 0, marginBottom: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'inOutAnimationSpinner', 
      [
        transition( ':enter', [
            style({ transform: "translateX(-50px)", opacity: 0, height: 0, marginBottom: 0 }),
            animate('100ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateX(0px)", opacity: 1, height: 936, marginBottom: 10 }))
          ]
        ),
        transition( ':leave',  [
            style({ transform: "translateX(0px)", opacity: 1, height: 936, marginBottom: 10 }),
            animate('100ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateX(-20px)", opacity: 0, height: 0, marginBottom: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'inOutAnimationAlert', 
      [
        transition( ':enter', [
            style({ transform: "translateY(-50px)", opacity: 0, height: 0, marginBottom: 0 }),
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateY(0px)", opacity: 1, height: 152, marginBottom: 10 }))
          ]
        ),
        transition( ':leave',  [
            style({ transform: "translateY(0px)", opacity: 1, height: 152, marginBottom: 10 }),
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',  style({ transform: "translateY(-20px)", opacity: 0, height: 0, marginBottom: 0 }))
          ]
        )
      ]
    )
  ],
  
})
export class SeekerComponent implements OnInit {
  title = 'Working with Pipe';
  checkProviders=false;
  titleCasePipe=new TitleCasePipe()
  testValue = this.titleCasePipe.transform('firstletter should be upper case.');
  
  @ViewChild('element') element!: ElementRef;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;

  tawkAPI: any;

  collection: Array<Plan> = [];
  p!: any;

  minValue: number = 10000;
  maxValue: number = 1500000;
  topeImponible!: number;
  environment = environment
  
  menuCheck: FormControl = new FormControl(true)


  // plans!: PlanPaginated;
  plans!: any;
  regions!: Array<Region>
  providers!: Array<Provider>
  providersFiltered!: Array<Provider>
  planTypes!: Array<PlanType>
  isapres!: Array<Isapre>
  suscriptionPrices!: Array<SuscriptionPrice>
  seekerObservable$ = new Subject<any>();

  priceRangeFormGroup!    : FormGroup;
  isapresFormGroup!       : FormGroup;
  planTypesFormGroup!     : FormGroup;
  regionsFormGroup!       : FormGroup;
  providersFormGroup!     : FormGroup;
  generalFormGroup!       : FormGroup;
  userProfileFormGroup!   : FormGroup;
  coupleProfileFormGroup! : FormGroup;
  searchProviders!        : FormControl;
  metadata!               : any;

  page          : number = 1;
  pageSize      : number = 15;
  userGender    : "Hombre" | "Mujer" = "Hombre";
  coupleGender  : "Hombre" | "Mujer" = "Hombre";
  innerWidth: any;
  timeOut: any;

  sietePorciento: number = 0; 

  optionsSearchLottie: any = {
    path: 'assets/lotties/search.json',
    autoplay: true,
    loop: true
  }; 

  @ViewChild('isapre1') isapre1!: ElementRef;
  @ViewChild('isapre2') isapre2!: ElementRef;
  @ViewChild('isapre3') isapre3!: ElementRef;
  @ViewChild('isapre4') isapre4!: ElementRef;
  @ViewChild('isapre5') isapre5!: ElementRef;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }


  valueHospitable: number = 100;
  optionsHospitable: Options = {
    floor: 40,
    ceil: 100,
    step: 10,
    showTicks: true,
    showTicksValues: true,
    translate: (value: number, label: LabelType): string => {
      return `${value}%`;
    }
  };

  valueAmbulatory: number = 100;
  optionsAmbulatory: Options = {
    floor: 40,
    ceil: 90,
    step: 10,
    showTicks: true,
    showTicksValues: true,
    translate: (value: number, label: LabelType): string => {
      return `${value}%`;
    }
  };



  options: Options = {
    floor: 10000,
    ceil: 1500000,
    step: 1,
    translate: (value: number, label: LabelType): string => {
      return '$'+formatNumber(value, "es", '.0-0');
    }
  };

  burdens: Array<{id: any, age: number, gender: string, suscriptionPrice: number}> = [];
  rangeTimeOut!: any;
  rangeTimeOutMinValue!: any;
  rangeTimeOutMaxValue!: any;

    planDescriptions = [
      "Cuentan con buenas coberturas en las clínicas del plan. Pueden cubrir hasta el 100% sin tope en hospitalización, no importa el costo, siempre que te atiendas en la clínica preferente.",
      "Con este tipo de planes se puede recibir atención médica en cualquier clínica y centro médico de Chile, aunque con “topes” de cobertura.",
      "Son más económicos e incluyen pago fijo de hospitalización. Con un plan cerrado solo puedes atenderte en los lugares que se indican en tu plan."
    ]
  
    
      consaludProfits = [
        {icon: faVirus, description: "Beneficios Covid-19"},
        {icon: faPiggyBank, description: "Hasta 100% de Dcto. Bonos Costo cero"},
        {icon: faTooth, description: "Hasta 60% de Dcto. Beneficios Dentales"},
        {icon: faBicycle, description: "Hasta 50% de Dcto. Reembolso Mountainbike"},
        {icon: faRunning, description: "Hasta 50% de Dcto. Reembolso Runnig"},
        {icon: faPills, description: "Hasta 30% de Dcto. Descuento en Farmacia"},
        {icon: faGlasses, description: "Hasta 15% de Dcto. Bonificación en Ópticas"},
        {icon: faSyringe, description: "Hasta 10% de Dcto. Vacunas"}
      ]
    


     ColmenaProfits = [
        {icon: faVirus, description: "Beneficios Covid-19"},
        {icon: faTooth, description: "Atención Dental Regiones"},
        {icon: faBone, description: "Atención Kinesiológica"},
        {icon: faBrain, description: "Atención Salud Mental"},
        {icon: faPiggyBank, description: "Bonos Costo cero"},
        {icon: faPhone, description: "Servicio Telefónico Colmena Mujer"},
        {icon: faPlane, description: "Millas LATAM Pass"},
        {icon: faUserMd, description: "Colmena Doctor"},
        {icon: faTooth, description: "Atención Dental Santiago"},
        {icon: faPills, description: "Hasta 30% de Dcto. Descuento en Farmacia"},
        
      ]

      banmedicaProfits= [
        {icon: faTooth, description: "Beneficios Dentales"},
        {icon: faGlasses, description: "Descuentos en ópticas"},
        {icon: faFileInvoiceDollar, description: "Beneficio cuenta conocida"},
        {icon: faStethoscope, description: "Plan Preventivo de Isapres"},
        {icon: faVirus, description: "Beneficios Covid-19"},
        {icon: faPills, description: "Hasta 30% de Dcto. Descuento en Farmacia"}
        
      ]
      
      cruzBlancaProfits= [
        {icon: faPiggyBank, description: "Bonos Costo cero"},
        {icon: faPhone, description: "Atención Telefónica Doctor"},
        {icon: faVirus, description: "Beneficios Covid-19"},
        {icon: faTooth, description: "Hasta 60% de Dcto.Beneficios Dentales"},
        {icon: faGlasses, description: "Hasta 20% de Dcto. Beneficios en Ópticas"},
        {icon: faPills, description: "Hasta 20% de Dcto.Descuento en Farmacia"}
      ]
   
    
      vidatresProfits = [
        {icon: faVirus, description: "Beneficios Covid-19"},
        {icon: faGlasses, description: "Descuentos en ópticas"},
        {icon: faFileInvoiceDollar, description: "Beneficio cuenta conocida"},
        {icon: faStethoscope, description: "Plan Preventivo de Isapres"},
        {icon: faTooth, description: "Beneficios Dentales"},
        {icon: faPills, description: "Hasta 30% de Dcto. Descuento en Farmacia"}    
      ]

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private seekerService: SeekerService,
    private loginService: LoginService,
    public splashScreenStateService: SplashScreenStateService,
    public globalService: GlobalService,
  ) { 
    registerLocaleData(es);
  }

  ngOnInit(): void {   
    
    this.innerWidth = window.innerWidth;
    // this.initChat();
    this.isLoggedIn();

    this.seekerService.getMetaData().subscribe(metadata => {
      this.topeImponible= metadata.find((meta: any) => meta.name == "valor_uf").value * metadata.find((meta: any) => meta.name == "tope_imponible").value
      this.metadata=metadata;
    })

    this.searchProviders = new FormControl('')

    this.userProfileFormGroup=this.formBuilder.group({
      region_id: [],
      age: [],
      gender: ["Hombre"],
      monthly_liquid_income: ["$"],
      couple: []
    })

    this.coupleProfileFormGroup=this.formBuilder.group({
      age: [],
      gender: ["Hombre"],
      monthly_liquid_income: ["$"]
    });


    this.userProfileFormGroup.get("age")?.valueChanges.subscribe(value =>{
      // this.seekerObservable$.next(true)      
    });

    this.coupleProfileFormGroup.get("age")?.valueChanges.subscribe(value =>{
      // this.seekerObservable$.next(true)      
    });

    this.userProfileFormGroup.get("monthly_liquid_income")?.valueChanges.subscribe(value =>{
      this.formatPriceWithMonthlyLiquidIncome(value, this.userProfileFormGroup)
    })

    this.coupleProfileFormGroup.get("monthly_liquid_income")?.valueChanges.subscribe(value =>{
      this.formatPriceWithMonthlyLiquidIncome(value, this.coupleProfileFormGroup)
    })
    

    this.searchProviders.valueChanges.subscribe((providerName: string) =>{
      this.searchProvider();
    })

    this.userProfileFormGroup.get("region_id")?.valueChanges.subscribe((providerName: string) =>{
      this.searchProvider();
    })

    this.userProfileFormGroup.get("couple")?.valueChanges.subscribe((value) =>{
      // !value && (() => { this.plans.data=null; this.seekerObservable$.next(true) })();
    });
    
    
    this.priceRangeFormGroup = this.formBuilder.group({
      minValue: [],
      maxValue: [],
      minValueHide: [],
      maxValueHide: [],
    });

    this.generalFormGroup = this.formBuilder.group({
      orderBy: [],
      orderType: [],
      term: [],
    });

    this.generalFormGroup.valueChanges.subscribe(values => {
      // this.plans.data=null
      // this.seekerObservable$.next(true) 
    })

    this.priceRangeFormGroup.get("minValueHide")?.valueChanges
    .subscribe(minValue =>  this.priceRangeFormGroup.get("minValue")?.setValue('$'+formatNumber(minValue, "es", '.0-0'), { emitEvent: false }))

    this.priceRangeFormGroup.get("maxValueHide")?.valueChanges
    .subscribe(maxValue =>  this.priceRangeFormGroup.get("maxValue")?.setValue('$'+formatNumber(maxValue, "es", '.0-0'), { emitEvent: false }))

    this.priceRangeFormGroup.get("minValue")?.valueChanges
    .subscribe(minValue =>  {
      minValue = this.formatPrice(minValue)   
      clearTimeout(this.rangeTimeOutMinValue)
      this.rangeTimeOutMinValue = setTimeout(()=>{
        this.minValue=minValue
        this.changeRangeLimits(minValue*0.7 as number, this.options.ceil as number);
      }, 1000)
      this.priceRangeFormGroup.get("minValue")?.setValue('$'+formatNumber(minValue, "es", '.0-0'), { emitEvent: false })
    });

    this.priceRangeFormGroup.get("maxValue")?.valueChanges
    .subscribe(maxValue =>  {
      maxValue = this.formatPrice(maxValue)   
    clearTimeout(this.rangeTimeOutMaxValue)
      this.rangeTimeOutMaxValue = setTimeout(()=>{
        this.maxValue=maxValue
        this.changeRangeLimits(this.options.floor as number, maxValue*1.5);
      }, 1000)
      this.priceRangeFormGroup.get("maxValue")?.setValue('$'+formatNumber(maxValue, "es", '.0-0'), { emitEvent: false })
    
    })

    this.getSearchData();

    this.seekerObservable$.pipe(
      debounceTime(600),
      switchMap((firstTime)=>{
        console.log(firstTime);
        return this.seekerService.getPlans(
                this.page, 
                this.pageSize, 
                firstTime ? "1" : this.getAllBeneficiaries(),
                firstTime ? 0 : this.minValue, 
                firstTime ? 1500000 : this.maxValue, 
                this.getPlanTypes(), 
                this.getIsapres(), 
                this.getProviders(),
                this.valueHospitable,
                this.valueAmbulatory,
                this.getTerm(),
                this.userProfileFormGroup.get("region_id")?.value | 0,
                this.getOrderBy(),
                this.getOrderType(),
                firstTime
                )
      }),
      distinctUntilChanged(),
    ).subscribe(response => {
      this.plans = response;
      this.initTippy()
    });

    this.seekerObservable$.next(true) 

  }

  formatPriceWithMonthlyLiquidIncome(MonthlyLiquidIncome: string | number, formGroup: FormGroup){
    MonthlyLiquidIncome = this.formatPrice(MonthlyLiquidIncome as string)
      this.getSietePorciento()
      clearTimeout(this.timeOut)
      this.timeOut=setTimeout(() =>{
        this.priceRangeFormGroup.get("minValue")?.setValue('$'+formatNumber(this.get10percent(), "es", '.0-0'))
        this.priceRangeFormGroup.get("maxValue")?.setValue('$'+formatNumber(this.sietePorciento, "es", '.0-0'))
      },600)

      formGroup.get("monthly_liquid_income")?.setValue('$'+formatNumber(MonthlyLiquidIncome, "es", '.0-0'), { emitEvent: false })

  }
  onUserChangePriceEnd(){
    this.changeRangeLimits(this.minValue*0.7 as number, this.maxValue*1.2 as number);
    // this.plans.data=null; 
    // this.seekerObservable$.next(true)
  }

  changeRangeLimits(min: number, max: number){
    
      const options: Options = {
        floor: min,
        ceil: max,
        step: 1,
        translate: (value: number, label: LabelType): string => {
          return '$'+formatNumber(value, "es", '.0-0');
        }
      };
      this.options=options
  }

  getAllBeneficiaries(): string{

    if(this.suscriptionPrices){

      const type = this.formatPrice(this.coupleProfileFormGroup.get("monthly_liquid_income")?.value) > 0 ? "contributor_price" : "burden_price";

      const suscriptionPriceUser   = this.suscriptionPrices[this.userProfileFormGroup.get("age")?.value | 0].contributor_price
      const suscriptionPriceCouple = this.suscriptionPrices[this.coupleProfileFormGroup.get("age")?.value | 0][type]

      let allBeneficiaries = `${suscriptionPriceUser}, `;

      allBeneficiaries += this.userProfileFormGroup.get("couple")?.value ? `${suscriptionPriceCouple}, ` : '';
      allBeneficiaries += this.burdens ? this.burdens.map((burden: any) => burden.suscriptionPrice).join(', ') : ''

      return allBeneficiaries
    }
    return "";
    

  }

  

  formatPrice(price: string){

    if(price){
      price = price.replace(/\./g,'');
      price = price.replace(/\$/g,'');
      const newPrice = Number.isNaN(parseInt(price)) ? 0 : parseInt(price)
      return newPrice;
    }
    return 0;
  }

  /* burden_price */
  addBurden(){

    this.burdens.push({
      id: this.makeRandomStr()+this.burdens.length+1,
      age: 0,
      gender: "masculino",
      suscriptionPrice: (this.suscriptionPrices.filter(suscription => suscription.age==0) as any)[0]["contributor_price"]
    });

    // this.plans.data=null
    // this.seekerObservable$.next(true) 

  }

  removeBurden(burden: {id: number, age: number, gender: string}){
    this.burdens=this.burdens.filter(bur => bur.id!= burden.id);
    // this.seekerObservable$.next(true)
  }

  changeBurdenAge(burdenID: string, newAge: number): void{

    this.burdens = this.burdens.map(burden =>{
      if(burden.id ==  burdenID){
        burden.age = newAge < 0 ? 0 : newAge;
      }
      return burden;
    });   

    this.updateBurdenSuscriptionPrice(burdenID)

  }

  changeBurdenGender(burdenID: string, gender: string){
    this.burdens = this.burdens.map(burden =>{
      if(burden.id ==  burdenID){
        burden.gender = gender;
      }
      return burden;
    })
  }

  updateBurdenSuscriptionPrice(burdenID: string){
    
    
    this.burdens = this.burdens.map(burden =>{
      if(burden.id ==  burdenID){
        const suscriptionPrice = (this.suscriptionPrices.filter(suscription => suscription.age==burden.age) as any)[0]
        burden.suscriptionPrice = suscriptionPrice[`burden_price`];
      }
      return burden;
    })
    // this.plans.data=null
    // this.seekerObservable$.next(true) 
    
  }

  chageBurdenAgeKeyUp(age: any, burdenID: string){

    if(!parseInt(age.value)){
      return
    }

    this.burdens = this.burdens.map(burden =>{
      if(burden.id ==  burdenID){
        burden.age = parseInt(age.value);
      }
      return burden;
    })
    this.updateBurdenSuscriptionPrice(burdenID)
  }

  makeRandomStr() {
    let str = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let i = 0; i < 10; i++) {
      str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return str;
  }

  debugfunction(param: any, param2: any){
    // console.log(this.burdens)
  }

  openPdfPlanDialog(plan: any){

    const dialogRef = this.dialog.open(PdfPlanDialogComponent, {
      height: '80%',
      width: this.innerWidth < 950 ? `90%` : '80%',
      maxWidth: "100vw",
      panelClass: 'pdf-dialog',
      data: {
       plan: plan,
       isapres: this.isapres,
       userProfile: {...this.userProfileFormGroup.value, monthly_liquid_income: this.formatPrice(this.userProfileFormGroup.get("monthly_liquid_income")?.value), gender: this.userGender},
       coupleProfile: {...this.coupleProfileFormGroup.value, monthly_liquid_income: this.formatPrice(this.coupleProfileFormGroup.get("monthly_liquid_income")?.value), gender: this.coupleGender},
       burdens: this.burdens.map(burden => {
         return {age: burden.age, gender: burden.gender}
       })
      }
    });
  }

    openPdfPlanDialogCartilla(plan: any){

      console.log({...plan, pdf: plan.pdf_benefits})
      console.log(plan)
      const dialogRef = this.dialog.open(PdfPlanDialogComponent, {
        height: '80%',
        width: this.innerWidth < 950 ? `90%` : '80%',
        maxWidth: "100vw",
        panelClass: 'pdf-dialog',
        data: {
         plan: {...plan, pdf: plan.pdf_benefits},
         isapres: this.isapres,
         userProfile: {...this.userProfileFormGroup.value, monthly_liquid_income: this.formatPrice(this.userProfileFormGroup.get("monthly_liquid_income")?.value), gender: this.userGender},
         coupleProfile: {...this.coupleProfileFormGroup.value, monthly_liquid_income: this.formatPrice(this.coupleProfileFormGroup.get("monthly_liquid_income")?.value), gender: this.coupleGender},
         burdens: this.burdens.map(burden => {
           return {age: burden.age, gender: burden.gender}
         }),
         pdf_benefits: true
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });

  }
  

  openContactForm(plan: Plan | undefined){
      const dialogRef = this.dialog.open(ContactFormDialogComponent, {
        width: this.innerWidth < 1000 ? `90%` : "1000px",
        maxWidth: "100vw",
        height:  this.innerWidth < 959 ? "90%" : "500px",
        panelClass: 'contact-form-dialog',
        data:{
          plan: plan,
          isapres: this.isapres,
          userProfile: {...this.userProfileFormGroup.value, monthly_liquid_income: this.formatPrice(this.userProfileFormGroup.get("monthly_liquid_income")?.value), gender: this.userGender},
          coupleProfile: {...this.coupleProfileFormGroup.value, monthly_liquid_income: this.formatPrice(this.coupleProfileFormGroup.get("monthly_liquid_income")?.value), gender: this.coupleGender},
          burdens: this.burdens.map(burden => {
            return {age: burden.age, gender: burden.gender}
          })
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
      });
  }


  openEditPlanDialog(plan: any){

    const dialogRef = this.dialog.open(ManagePlanComponent, {
      height: '80%',
      width: this.innerWidth < 950 ? `90%` : '600px',
      maxWidth: "100vw",
      panelClass: 'manage-plan-dialog',
      data: {
        providers: this.providers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });

  }


  getPlanTypes(){
    const planTypes: any = []
      if(this.planTypesFormGroup){
        Object.entries(this.planTypesFormGroup.value).map((planType) =>{
          if(planType[1])
            planTypes.push(planType[0])
        })
      } else {
        planTypes.push(1,2,3)
      }
      return planTypes;

  }
  getIsapres(){

    const isapres: any = []
      if(this.isapresFormGroup){
        Object.entries(this.isapresFormGroup.value).map((isapre) =>{
          if(isapre[1])
            isapres.push(isapre[0])
        })
      } else {
        isapres.push(1,2,3,4,5)
      }
      return isapres;

  }
  getProviders(){
    let providers: any = []
      if(this.providersFormGroup){
        providers = this.providersFormGroup.value.providers
      } else {
        for (let index = 1; index < 86; index++) {
          
          (index!=2) && providers.push(index);
        }
      }
      return providers;

  }
  getOrderBy(){ return this.generalFormGroup.get("orderBy")?.value }
  getOrderType(){ return this.generalFormGroup.get("orderType")?.value }
  getTerm(){ return this.generalFormGroup.get("term")?.value }

  getSearchData(){

    this.seekerService.getSearchData().subscribe(response =>{

      this.regions = response.regions
      this.providers = response.providers
      this.providersFiltered = response.providers
      this.planTypes = response.planTypes
      this.isapres = response.isapres
      this.suscriptionPrices = response.suscriptionPrices

      const isapresFormGroup: { [key: string]: any } = {}
      this.isapres.map((isapre: Isapre) => isapresFormGroup[isapre.id as number] = [true] )
      this.isapresFormGroup=this.formBuilder.group(isapresFormGroup);

      this.isapresFormGroup.valueChanges.subscribe(() => {
        // this.plans.data=null
        // this.seekerObservable$.next(true)
      })


      const planTypesFormGroup: { [key: string]: any } = {}
      this.planTypes.map(planType => planTypesFormGroup[planType.id] = [false] )
      this.planTypesFormGroup=this.formBuilder.group(planTypesFormGroup);

      this.planTypesFormGroup.valueChanges.subscribe(value => {
        // this.plans.data=null
        // this.seekerObservable$.next(true)
      })

      const regionsFormGroup: { [key: string]: any } = {}
      this.regions.map(region => regionsFormGroup[region.id] = [true] )
      this.regionsFormGroup=this.formBuilder.group(regionsFormGroup);

      this.regionsFormGroup.valueChanges.subscribe(region => this.searchProvider() )



      this.providersFormGroup=this.formBuilder.group({
        providers: [this.providers.map(provider => provider.id)]
      });

      this.providersFormGroup.valueChanges.subscribe(value => {
        // this.plans.data=null
        // this.seekerObservable$.next(true)
      })

    })

  }

  searchProvider(){
    this.providersFiltered=[];

      const regionID=this.userProfileFormGroup.get("region_id")?.value;

      this.providersFiltered= regionID ? [...this.providers.filter(provider => provider.region_id==parseInt(regionID))] : this.providers

        this.providersFiltered = this.providersFiltered.filter((provider: any) => {
          return provider.name.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(this.searchProviders.value.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
        })

        let providers = []
        
      this.providersFormGroup.get("providers")?.setValue(this.providersFiltered.map(provider =>provider.id))

      // this.plans.data=null
      // this.seekerObservable$.next(true) 

  }


  // paginate(event: any){
  //   this.pageSize = event.pageSize
  //   this.page = event.pageIndex+1
  //   this.plans.data=null
  //     this.seekerService.getPlans(
  //               this.page, 
  //               this.pageSize, 
  //               this.getAllBeneficiaries(), 
  //               this.minValue, 
  //               this.maxValue, 
  //               this.getPlanTypes(), 
  //               this.getIsapres(), 
  //               this.getProviders(),
  //               this.valueHospitable,
  //               this.valueAmbulatory,
  //               this.getTerm(),
  //               this.userProfileFormGroup.get("region_id")?.value | 0,
  //               this.getOrderBy(),
  //               this.getOrderType()
  //     ).subscribe(response => {
  //       this.plans = response;
  //     });
  // }

  isLoggedIn(){
  this.loginService.isLoggedIn()
      .subscribe(
          (resp: any) => {
            this.loginService.user=resp.response.user
            this.loginService.userObservable.next(resp.response.user)
          },
          err => {
              /* this.disableContent=false; */
          }
      )
  }

  checkIfLoggedIn(): boolean{
      return !(Object.keys(this.loginService.user).length === 0)
  }

  getPlanProviderHTML(planProviders: any): string{
    
      let HTMLText = `<ul style="list-style: none;padding: 0;font-size: 12px;font-weight: 500;">`
      planProviders = planProviders.map((provider: any, index: number) =>{
        if(index >3){
          HTMLText+=`
          <li style="margin-top: 2px;line-height: 1;display: flex;">
            <div>
              <img style='margin-right:5px;height:12px;width:12px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Green_check_icon_with_gradient.svg/1200px-Green_check_icon_with_gradient.svg.png' />
            </div>
            <div>${this.titleCasePipe.transform(provider.provider_data.name)}</div>
          </li>`
          return provider;
        }
      });
      HTMLText+='</ul>';
      return HTMLText;
  }

  checkUncheckProviders(){
    let providers = []

    for (let index = 1; index < 86; index++) {
      providers.push(index);
    }

    !this.checkProviders ? this.providersFormGroup.setValue({providers:[]}) : this.providersFormGroup.setValue({providers})
    
    this.checkProviders= !this.checkProviders
  }
    
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getMinPrice(){
    return this.formatPrice(this.priceRangeFormGroup.get("minValue")?.value)
  }

  get10percent(){
    return  parseInt((this.sietePorciento-(this.sietePorciento * 0.1)-1).toFixed(0))
  }
  getTopeImponibleCPL(){
    return parseFloat((this.topeImponible*0.0875).toFixed(2));
  }


  getSietePorciento(){
    
    const userMonthlyLiquidIncome = this.formatPrice(this.userProfileFormGroup.get("monthly_liquid_income")?.value);
    const coupleMonthlyLiquidIncome = this.formatPrice(this.coupleProfileFormGroup.get("monthly_liquid_income")?.value);
    
    let totalIncome = userMonthlyLiquidIncome + coupleMonthlyLiquidIncome;
    
    let sietePorciento=0

    sietePorciento = totalIncome <= 702250 ? (totalIncome * 7) / 80.96 : sietePorciento
    sietePorciento = totalIncome <= 1525825 ? (totalIncome * 7) / 79.46 : sietePorciento
    sietePorciento = totalIncome <= 1896201 ? (totalIncome * 7) / 78.22 : sietePorciento
    sietePorciento = totalIncome > 1896201 ? 29700 * 81.6 * 0.07 : sietePorciento

    // const sietePorciento= totalIncome < this.topeImponible ? totalIncome*0.0875 : this.topeImponible*0.0875;
    

    this.sietePorciento = parseFloat(sietePorciento.toFixed(2))
  }


  round5(x: any){
    return Math.round((x*10)/5)*5;
  }

  formatProvidersForShow(providers: any): Array<{provider_data: {name: string}, percentage_hospitable: string, percentage_ambulatory: string}>{
    let providersForShow: any=[];
    let restante!: any
    this.providersFiltered.map(providerFiltered =>{

      restante = providers.filter((provider:any) =>{
        if(providerFiltered?.name==provider.provider_data?.name){
          providersForShow.push(provider)
          return false
        }
        return true
      })
    })
    providersForShow = restante ? [...providersForShow, ...restante ] : providers
    return providersForShow

  }

  checkProviderFeature(provider: any){
    return this.providersFormGroup.get("providers")?.value.find((providerID: number) => providerID==provider.provider_data.id)
    
  }

  getExcedent(planPrice: number){
    return parseFloat((this.sietePorciento-planPrice).toFixed(2));
  }

  initTippy(){

    const isapreBenefitsOptions= {
      allowHTML: true,
      theme: 'light-border',
      trigger: "click",
      interactive: true,

    }
    setTimeout(()=>{
      tippy("#isapre-benefits-1", {
        ...isapreBenefitsOptions,
        content: this.isapre1.nativeElement.innerHTML
      });

      tippy("#isapre-benefits-2", {
        ...isapreBenefitsOptions,
        content: this.isapre2.nativeElement.innerHTML
      });

      tippy("#isapre-benefits-3", {
        ...isapreBenefitsOptions,
        content: this.isapre3.nativeElement.innerHTML
      });

      tippy("#isapre-benefits-4", {
        ...isapreBenefitsOptions,
        content: this.isapre4.nativeElement.innerHTML
      });

      tippy("#isapre-benefits-5", {
        ...isapreBenefitsOptions,
        content: this.isapre5.nativeElement.innerHTML
      });
    },1000)
    
  }


  initChat(){
    var Tawk_API: any = Tawk_API || {},
        Tawk_LoadStart = new Date();
    (function() {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0] as any;
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60dd0d847f4b000ac03a6f80/1f9fnpjqj';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
  }

  getProfileValid(): boolean{
    return this.userProfileFormGroup.get("age")?.value && this.formatPrice(this.userProfileFormGroup.get("monthly_liquid_income")?.value) > 0
  }

  seekPlans(){

    if(this.getProfileValid()){
      this.page=1;
      this.seekerObservable$.next(false); 
      this.menuCheck.setValue(!this.menuCheck.value)

      if(this.plans===undefined){
        this.plans = null as any
      }else {
        this.p = 0;
        this.plans.data=null
      }

    } else{
      this.globalService.openSnackbar("Debes añadir tu renta mensual liquida y tu edad para elegir los mejores planes de acuerdo a tu perfil", "red-snackbar", "", 3000)
    }
  }

  goToLink(url: string){
      window.open(url, "_blank");
  }

  getPlansCollection(): Collection<unknown> {
    return this.plans.data as Collection<unknown>
  }


  testFunctiont(){
    const apellido= "Hernandez"
    console.log(apellido)
  }

}