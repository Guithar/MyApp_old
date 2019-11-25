import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MaintService } from '../_services/maint.service';
import { MaintForList } from '../_models/maintForList';

@Injectable()
export class MaintListResolver implements Resolve<MaintForList[]> {
    constructor(private maintService: MaintService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<MaintForList[]> {

            return this.maintService.getMaints(route.params['id']).pipe(
                catchError(() => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/clients']);
                    return of(null);
                })
            );
    }
}
