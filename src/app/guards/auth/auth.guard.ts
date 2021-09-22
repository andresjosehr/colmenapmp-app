import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

 

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  roleAccess: Array<string[]> = [];

  menuItems = ["main-view", "main-view-basic", "main-view-advanced", "trends", "trends-crop-area", "trends-islands", "trends-equipment", "alarms", "alarms-history", "alarms-config", "config", "config-planning", "config-advanced", "trend-analysis", "user", "help", "users-users", "exit"]
 

  constructor (
               public loginService: LoginService,
               public router: Router,
               ) {
               }

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Observable<boolean>(obs => {
        if(this.loginService.user){
          if(Object.keys(this.loginService.user).length !== 0){
            return obs.next(true);
          }
        }

          this.loginService.isLoggedIn().subscribe(

            (response: any) => {
              this.menuItems.map(value =>{
              })

              this.loginService.user=response.response.user

              this.loginService.userObservable.next(response.response)

              obs.next(true)
            },
            (error) => {
              this.router.navigate(['/buscar-planes', { message: "Debes iniciar sesion para continuar", redirectPrevURL: true, err: true}]);
              obs.next(false)
            },
          );
    });
  }

}