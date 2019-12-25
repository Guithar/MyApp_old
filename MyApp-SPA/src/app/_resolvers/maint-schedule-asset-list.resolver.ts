
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MaintScheduleAsset } from '../_models/maintScheduleAsset';
import { MaintScheduleAssetService } from '../_services/maintScheduleAsset.service';

@Injectable()
export class MaintScheduleAssetListResolver implements Resolve<MaintScheduleAsset[]> {
    constructor(private maintScheduleAssetService: MaintScheduleAssetService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<MaintScheduleAsset[]> {
            return this.maintScheduleAssetService.getMaintScheduleAssets(route.params['clientId']
            , route.params['assetId']).pipe(
                catchError(() => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
