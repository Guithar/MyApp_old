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
  updateClient(id: number, client: Client) {
    return this.http.put(this.baseUrl + 'clients/' + id, client);
  }
  createClient(client: Client) {
    return this.http.post(this.baseUrl + 'clients/', client);
  }
  deleteClient(id: number) {
    return this.http.post(this.baseUrl + 'clients/' + id, {});
  }


}
