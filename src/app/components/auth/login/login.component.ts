import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!                  : FormGroup;
  redirectPrevURL             : boolean = false;
  backendValidationErrors     : any;
  errors                      : Array<Array<string>>=[];
  disableContent              : boolean = true

  env = environment

  private _unsubscribeAll: Subject<any> = new Subject();

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private globalService: GlobalService,
        public activatedRoute: ActivatedRoute,
        public router: Router
      )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      this.loginForm = this._formBuilder.group({
          email   : [ '', [Validators.required]],
          password: [ '', Validators.required ]
      });
      
      this.activatedRoute.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params)=>{

          if(params.message){
              this.globalService.openSnackbar(
                  params.message,
                  params.err ? "red-snackbar" : "green-snackbar"
              )
          }
          if(params.redirectPrevURL){
              this.redirectPrevURL=true
          }
      })

      this.loginService.isLoggedIn()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
          (resp: any) => {
            
            this.loginService.user=resp.response.user
          
            this.router.navigate(["/buscar-planes"])
          },
          err => {
              this.disableContent=false;
          }
      )
  }

  login(){

      if(!this.loginForm.invalid){
          this.disableContent=true;

          this.loginService.login(
              this.loginForm.get("email")?.value,
              this.loginForm.get("password")?.value
          )
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(
              
              (response: any) => {
                  this.globalService.openSnackbar(response.message)
                  localStorage.setItem("Authorization", `Bearer  ${response.response.token}`);

                  return this.router.navigate(["/buscar-planes"])


              },
              (error: any) => {

                  this.disableContent=false;

                  this.globalService.openSnackbar(error.error.message, "red-snackbar");
                  this.errors=this.globalService.getBackEndValidationErrors(error.error);
                  for(let field in this.errors) 
                      this.loginForm.get(field)?.setErrors({incorrect: true}); 

              },
          )
      }
  }

  ngOnDestroy(): void{
  
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }  

}
