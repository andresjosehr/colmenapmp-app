import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { Region } from 'src/app/interfaces/region/region';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(
    private httpClient: HttpClient,
    private globalService: GlobalService
  ) { }

  getAllRegions(): Observable<Array<Region>>{

    return this.httpClient.get<{response: Region}>(`${environment.apiUrl}/get-all-regions`).pipe(
      pluck("response"),
      catchError((err) => {
        this.globalService.catchHttpError(err)
        err=empty();
        return of(err);
    }));
}

}
