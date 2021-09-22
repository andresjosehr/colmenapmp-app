import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { Provider, ProvidersPaginated } from 'src/app/interfaces/provider/provider';
import { HttpGeneralResponse } from 'src/app/interfaces/general/general';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global/global.service';
import { InterceptorService } from '../http-interceptor/HttpInterceptor.service';



@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) { }

  getProviders(
      term?: string,
      orderBy?: string,
      orderType?: string
  ): Observable<ProvidersPaginated>{

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

      return this.httpClient.get<{response: ProvidersPaginated}>(`${environment.apiUrl}/providers`, { params: params }).pipe(
        pluck("response"),
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
      }));
  }


  storeProvider(provider: Provider): Observable<HttpGeneralResponse>{

    return this.httpClient.post<{response: ProvidersPaginated}>(`${environment.apiUrl}/providers`, provider).pipe(
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
    }));
  }

  updateProvider(provider: Provider, providerID: number): Observable<HttpGeneralResponse>{
    

    return this.httpClient.put<{response: ProvidersPaginated}>(`${environment.apiUrl}/providers/${providerID}`, provider).pipe(
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
    }));
  }


  deleteProvider(providerID: number): Observable<HttpGeneralResponse>{

    return this.httpClient.delete<{response: ProvidersPaginated}>(`${environment.apiUrl}/providers/${providerID}`).pipe(
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
    }));
  }

  
}
