
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AssetService } from '../_services/asset.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asset } from '../_models/asset';
import { MaintScheduleService } from '../_services/maintSchedule.service';
import { MaintScheduleAsset } from '../_models/maintScheduleAsset';

@Injectable()
export class MaintScheduleAssetListResolver implements Resolve<MaintScheduleAsset[]> {
    constructor(private maintScheduleService: MaintScheduleService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<MaintScheduleAsset[]> {
            return this.maintScheduleService.getMaintScheduleAssets(route.params['assetId']).pipe(
                catchError(() => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
