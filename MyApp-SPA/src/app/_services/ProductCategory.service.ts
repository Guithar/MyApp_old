import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../_models/productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.baseUrl + 'categories');
  }
}
