import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IHttpState } from './IHttpState.interface';


@Injectable({
    providedIn: 'root'
  })
  export class HttpStateService {
    public state = new BehaviorSubject<IHttpState>({} as IHttpState);
  
    constructor() { }
  }
  
  