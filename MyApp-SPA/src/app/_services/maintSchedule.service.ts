import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MaintSchedule } from '../_models/maintSchedule';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaintScheduleService {

  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
getMaintSchedules(maintScheduleParam?): Observable<MaintSchedule[]> {

  let params = new HttpParams();

  if (maintScheduleParam != null) {
    params = params.append('ProductCategoryId', maintScheduleParam.ProductCategoryId);
  }

  return this.http.get<MaintSchedule[]>(this.baseUrl + 'maintschedules', { observe: 'response', params})
  .pipe(
    map(response => {
      return response.body;
    })
  );

  }
}
