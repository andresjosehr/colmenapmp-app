import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreenStateService } from './services/general/splash-scree/splash-screen-state.service';
import { Location } from '@angular/common';
import { LoginService } from './services/login/login.service';
import { GlobalService } from './services/global/global.service';
import { HttpStateService } from './services/http-interceptor/HttpStateService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  path: string = '';
  constructor(
      private splashScreenStateService: SplashScreenStateService,
      private router                  : Router,
      public  globalService           : GlobalService,
      public  httpStateService        : HttpStateService,
  ){
    }


  ngOnInit(): void {
    
    setTimeout(() => {
      (this.globalService.path != "/buscar-planes" && this.globalService.path != "") && this.splashScreenStateService.stop();
    }, 3000);
  }

}
