import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Asset } from '../_models/asset';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }
    // http://localhost:5000/api/clients/10/assets
    getAssets(clientId: number): Observable<Asset[]> {
        return this.http.get<Asset[]>(this.baseUrl + 'clients/' + clientId + '/assets');
    }

    getAsset(clientId: number, assetId: number): Observable<Asset> {
            return this.http.get<Asset>(this.baseUrl + 'clients/' + clientId + '/assets/' + assetId);
    }

    updateAsset(clientId: number, id: number, asset: Asset) {
        return this.http.put(this.baseUrl + 'clients/' + clientId + '/assets/' + id , asset);
    }
    createAsset(clientId: number, asset: Asset) {
        return this.http.post (this.baseUrl + 'clients/' + clientId + '/assets', asset);
    }

    deleteAsset(clientId: number, id: number) {
        return this.http.delete(this.baseUrl + 'clients/' + clientId + '/assets/' + id, {});
    }

}
