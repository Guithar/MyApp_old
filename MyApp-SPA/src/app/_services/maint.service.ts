import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MaintForList } from '../_models/maintForList';

@Injectable({
  providedIn: 'root'
})
export class MaintService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
  getMaints(clientId: number): Observable<MaintForList[]> {
      return this.http.get<MaintForList[]>(this.baseUrl + 'clients/' + clientId + '/maints');
  }

}
