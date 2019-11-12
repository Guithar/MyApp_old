import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AssetService } from '../_services/asset.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asset } from '../_models/asset';

@Injectable()
export class AssetListResolver implements Resolve<Asset[]> {
    constructor(private assetService: AssetService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Asset[]> {
        if (route.params['id'] !== 'new') {
            return this.assetService.getAssets(route.params['id']).pipe(
                catchError(() => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
        }
    }
}
