import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { Isapre, IsapresPaginated } from 'src/app/interfaces/isapre/isapre';
import { HttpGeneralResponse } from 'src/app/interfaces/general/general';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global/global.service';
import { InterceptorService } from '../http-interceptor/HttpInterceptor.service';



@Injectable({
  providedIn: 'root'
})
export class IsapresService {

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) { }

  getIsapres(
      term?: string,
      orderBy?: string,
      orderType?: string
  ): Observable<IsapresPaginated>{

      let params = new HttpParams();
      if(orderBy && orderType){
        params = params.append('orderBy', orderBy);
        params = params.append('orderType', orderType);
      }
      if(term){
        params = params.append('term', term);
      }

      console.log(term,
        orderBy,
        orderType)

      return this.httpClient.get<{response: IsapresPaginated}>(`${environment.apiUrl}/isapres`, { params: params }).pipe(
        pluck("response"),
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
      }));
  }

  getIsapresForContact(): Observable<IsapresPaginated>{

    return this.httpClient.get<{response: IsapresPaginated}>(`${environment.apiUrl}/get-isapres-for-contact`, ).pipe(
      pluck("response"),
      catchError((err) => {
        this.globalService.catchHttpError(err)
        err=empty();
        return of(err);
    }));
}
  storeIsapre(isapre: Isapre): Observable<HttpGeneralResponse>{

    let formData: FormData = new FormData();
    formData.append('logo', (isapre.logo as any)._files[0]);
    formData.append('name', isapre.name);
    formData.append('ges', isapre.ges.toString());

    return this.httpClient.post<{response: IsapresPaginated}>(`${environment.apiUrl}/isapres`, formData).pipe(
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
    }));
  }

  updateIsapre(isapre: Isapre, isapreID: number): Observable<HttpGeneralResponse>{

    let formData: FormData = new FormData();
    formData.append('logo', (isapre.logo as any)._files ? (isapre.logo as any)._files[0] : isapre.logo);
    formData.append('name', isapre.name);
    formData.append('ges', isapre.ges.toString());
    formData.append('_method', 'PUT')

    return this.httpClient.post<{response: IsapresPaginated}>(`${environment.apiUrl}/isapres/${isapreID}`, formData).pipe(
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
    }));
  }


  deleteIsapre(isapreID: number): Observable<HttpGeneralResponse>{

    return this.httpClient.delete<{response: IsapresPaginated}>(`${environment.apiUrl}/isapres/${isapreID}`).pipe(
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
    }));
  }

  
}
