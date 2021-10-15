import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, debounceTime, pluck, switchMap } from 'rxjs/operators';
import { GlobalService } from '../global/global.service';
import { empty, Observable, of } from 'rxjs';
import { Plan, PlanPaginated } from 'src/app/interfaces/plan/plan';
import { HttpGeneralResponse, SearchData } from 'src/app/interfaces/general/general';
import { Client } from 'src/app/interfaces/client/client';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
    ) { }

    getPlans(
      page: string | number = "1",
      pageSize: string | number = "15",
      burdens: string = '',
      minPrice: number = 10000,
      maxPrice: number = 1500000,
      planTypes: Array <any>,
      isapres: Array <any>,
      providers: Array <any>,
      hospitablePercentage: number,
      ambulatoryPercentage: number,
      term: string,
      regions: Array <any>,
      orderBy: string,
      orderType: string,
      firstTime: boolean
      ): Observable<PlanPaginated>{

        let params = new HttpParams();
        
        params = params.append('burdens',  burdens);
        params = params.append('planTypes',  planTypes.join(', '));
        params = params.append('isapres',  isapres.join(', '));
        params = params.append('providers',  providers.join(', '));
        params = params.append('regions', regions.join(', '));
        params = params.append('ambulatoryPercentage', ambulatoryPercentage.toString());
        params = params.append('hospitablePercentage', hospitablePercentage.toString());
        params = params.append('page', page.toString());
        params = params.append('minPrice', minPrice.toString());
        params = params.append('maxPrice', maxPrice.toString());
        params = params.append('pageSize', pageSize.toString());
        params = params.append('firstTime', firstTime.toString());
        

        if(orderBy && orderType){
          params = params.append('orderBy', orderBy);
          params = params.append('orderType', orderType);
        }
        if(term){
          params = params.append('term', term);
        }
        
        return this.httpClient.get<{response: PlanPaginated}>(`${environment.apiUrl}/get-plans`, { params: params }).pipe(
          pluck("response"),
          catchError((err) => {
            this.globalService.catchHttpError(err)
            err=empty();
            return of(err);
        }));
    }


    getSearchData(): Observable<SearchData>{

      return this.httpClient.get<{response: SearchData}>(`${environment.apiUrl}/get-search-data`).pipe(
        pluck("response"),
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
        }));
    }


    getMetaData(): Observable<any>{

      return this.httpClient.get<{response: any}>(`${environment.apiUrl}/get-meta-data`).pipe(
        pluck("response"),
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
        }));
    }

    makeContact(client: Client, burdens: any, coupleProfile: any,  plan_id: number): Observable<any>  {
      return this.httpClient.post(`${environment.apiUrl}/make-contact`, {client, burdens, coupleProfile, plan_id}).pipe(
        pluck("response"),
        catchError((err) => {
          this.globalService.catchHttpError(err)
          err=empty();
          return of(err);
        }));
    }


}
