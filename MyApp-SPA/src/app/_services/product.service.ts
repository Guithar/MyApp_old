import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getProducts(productParam?): Observable<Product[]> {

    let params = new HttpParams();

    if (productParam != null) {
      params = params.append('categoryId', productParam.categoryId);
    }

    return this.http.get<Product[]>(this.baseUrl + 'products', { observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getProduct( id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }
}
