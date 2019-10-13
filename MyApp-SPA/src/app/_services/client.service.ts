import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../_models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
getClients(): Observable<Client[]> {
  return this.http.get<Client[]>(this.baseUrl + 'clients');
}

getClient( id: number): Observable<Client> {
  return this.http.get<Client>(this.baseUrl + 'clients/' + id);
}
}
