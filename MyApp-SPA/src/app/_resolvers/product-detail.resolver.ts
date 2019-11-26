
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';


@Injectable()
export class ProductDetailResolver implements Resolve<Product> {
    constructor(private productService: ProductService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {

        if (route.params['id'] !== 'new') {
           return this.productService.getProduct(route.params['id']).pipe(
            catchError(() => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
        }
    }
}
