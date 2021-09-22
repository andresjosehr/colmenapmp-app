import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm!: FormGroup;
    email!: string;
    token!: string;

    // Private
    private _unsubscribeAll: Subject<any>  = new Subject();

    constructor(
        private _formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private globalService: GlobalService
    )
    {

        this.activatedRoute.params
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((params)=>{
            this.email=params.email;
            this.token=params.token;
            if(!this.email || !this.token){
                this.router.navigate(["/buscar-planes"])
            }
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.resetPasswordForm = this._formBuilder.group({
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password')?.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm')?.updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    resetPassword(){
        this.loginService.resetPassword(
            this.email,
            this.token,
            this.resetPasswordForm.get('password')?.value,
            this.resetPasswordForm.get('passwordConfirm')?.value
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (response) => this.router.navigate(["/ingresar", {message: "Contraseña restablecida exitosamente"}]),
            (error) => this.globalService.openSnackbar("Ha ocurrido un error actualizando la contraseña", "red-snackbar")
        )
    }
}



/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};

}
