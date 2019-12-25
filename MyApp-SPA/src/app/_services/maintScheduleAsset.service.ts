import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaintScheduleAsset } from '../_models/maintScheduleAsset';

@Injectable({
  providedIn: 'root'
})
export class MaintScheduleAssetService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

    getMaintScheduleAssets(
      clientId: number,
      assetId: number): Observable<MaintScheduleAsset[]> {

      return this.http.get<MaintScheduleAsset[]>(this.baseUrl
        + 'clients/' + clientId + '/maintscheduleassets/' + assetId );
      }

      updateMaintScheduleAsset(
        clientId: number,
        assetId: number,
        maintScheduleId: number,
        maintScheduleAsset: MaintScheduleAsset) {

        return this.http.put(this.baseUrl +
          'clients/' + clientId + '/maintscheduleassets/'
          + assetId + '/' + maintScheduleId,  maintScheduleAsset);

      }
      createMaintScheduleAsset(
        clientId: number,
        assetId: number,
        maintScheduleAsset: MaintScheduleAsset ) {

        return this.http.put(this.baseUrl +
          'clients/' + clientId + '/maintscheduleassets/'
          + assetId,  maintScheduleAsset);
      }

      deleteMaintScheduleAsset(
        clientId: number,
        assetId: number,
        maintScheduleId: number) {

        return this.http.delete(this.baseUrl +
          'clients/' + clientId + '/maintscheduleassets/'
          + assetId + '/' + maintScheduleId);
      }

  }
