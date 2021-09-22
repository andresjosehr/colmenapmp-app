import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  user: any = {};
  role: any = {};
  instalations: any = {};
  userMetadata: any = {};
  userObservable: Subject<any> = new BehaviorSubject({});

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private globalService: GlobalService
  ){
  }

  login(email: string, password: string){

    return this.httpClient.post(`${environment.apiUrl}/login`, {email, password})

  }
  
  isLoggedIn(fcm_token: string = ''){

    let headers = new HttpHeaders();    
    headers = headers.set('Authorization', localStorage.getItem('Authorization') as string);    

    return this.httpClient.post(`${environment.apiUrl}/check-login`, {fcm_token: fcm_token}, {headers})
  }

  logout(message = 'Tu sesion ha sido cerrada correctamente' ){

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem('Authorization') as string);    
    
    this.httpClient.get(`${environment.apiUrl}/logout`, {headers}).subscribe(response => {
      localStorage.removeItem('Authorization');

      this.user={};
      this.role = {};
      this.instalations={};
      this.userMetadata={}

      this.globalService.openSnackbar(message, "green-snackbar")
      if(this.globalService.path!="/buscar-planes" ){
        this.router.navigate(["/buscar-planes", {message}])
      }
      
    });
  }

  sendResetPasswordRequest(email: string){

    return this.httpClient.post(`${environment.apiUrl}/reset-password-request`, {email})

  }

  resetPassword(email: string, token: string, password: string, passwordConfirm: string){

    return this.httpClient.post(`${environment.apiUrl}/reset-password`, {email, token, password, passwordConfirm})

  }

  getUser(){
    this.httpClient.get(`${environment.apiUrl}/get-user`).subscribe(
      (response: any) => {
        this.user=response.response
        this.role=response.role_instalations
        this.instalations=response.role_instalations.instalations
        this.userMetadata=response.user_metadata
        this.userObservable.next(this.user);
      },
      (error) => {
          this.logout("Debes iniciar sesion para continuar");
          return this.router.navigate(["auth/login", {message: 'Debes iniciar sesion para continuar', err: true}])
      }
    )
  }

}
