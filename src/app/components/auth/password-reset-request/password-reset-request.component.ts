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
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {

    forgotPasswordForm!: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject();
    
    constructor(
        private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private globalService: GlobalService
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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    sendResetPasswordRequest(){

        const email = this.forgotPasswordForm.get("email")?.value;

        this.loginService.sendResetPasswordRequest(email)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (response) => this.router.navigate(["/confirmacion-email"]),
            (error) => this.globalService.openSnackbar(error.error.message, "red-snackbar")
        )
    }

    ngOnDestroy(): void{
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }  

}
