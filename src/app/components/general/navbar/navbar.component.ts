import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  tabs = [true, false, false, false, false, false, false]
  constructor(
    public loginService: LoginService,
    public gobalService: GlobalService,
    private router: Router,
    public locaton: Location
  ) { }

  ngOnInit(): void {
    
    const routerEvent = this.router.events.subscribe((val) => {

      const paths: { [key: string]: number } = {}
      paths["/buscar-planes"]                = 0;
      paths["/administracion/isapres"]       = 1;
      paths["/administracion/proveedores"]   = 2;
      paths["/administracion/planes"]        = 3;
      paths["/administracion/usuarios"]      = 4;
      paths["/administracion/clientes"]      = 5;

      const path = this.locaton.path().split(";")[0].split("?")[0];

      this.tabs = this.tabs.map(tab => false);
      this.tabs[paths[this.gobalService.path]]=true;

      routerEvent.unsubscribe();
    });
  
  }

  changeActiveTab(tab: number): void{
    this.tabs = this.tabs.map(tab => false);
    this.tabs[tab]=true;
  }

}
