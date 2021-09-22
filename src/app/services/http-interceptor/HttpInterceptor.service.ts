import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HttpStateService } from './HttpStateService';
import { Observable, Subject } from 'rxjs';
import { tap, retryWhen, take, delay, finalize } from 'rxjs/operators';
import { HttpProgressState } from './HttpProgressState.enum';
import { GlobalService } from '../global/global.service';
/* import { FuseProgressBarComponent } from '@fuse/components/progress-bar/progress-bar.component'; */

@Injectable({
    providedIn: 'root'
  })
  export class InterceptorService implements HttpInterceptor {

    requestingCount: number = 0;
    isRequesting: Subject<boolean> = new Subject();
  
    constructor(
      private httpStateService  : HttpStateService,
      private globalService     : GlobalService
    ) {}
  
    /**
     * Intercepts all requests
     * - in case of an error (network errors included) it repeats a request 3 times
     * - all other error can be handled an error specific case
     * and redirects into specific error pages if necessary
     *
     * There is an exception list for specific URL patterns that we don't want the application to act
     * automatically
     * 
     * The interceptor also reports back to the httpStateService when a certain requests started and ended 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authorization = localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") as string : ''

      // console.log(this.globalService.contentType);
      const requestModified = request.clone({
        headers: new HttpHeaders({
          'Authorization': authorization
        })
      });

      this.requestingCount++;
      
      this.httpStateService.state.next({
        url: requestModified.url,
        state: HttpProgressState.start,
        requestingCount: this.requestingCount
      });


      return next.handle(requestModified).pipe(
              finalize(() => {
                this.requestingCount--;
                  this.httpStateService.state.next({
                    url: requestModified.url,
                    state: HttpProgressState.end,
                    requestingCount: this.requestingCount
                  });
              })
      );
    }
  }