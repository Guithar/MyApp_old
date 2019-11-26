import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-skeleton',
  templateUrl: './product-skeleton.component.html',
  styleUrls: ['./product-skeleton.component.css']
})
export class ProductSkeletonComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  @ViewChild ('productDetailComponent', {static: true})
  productDetailComponent: ProductDetailComponent;

    product: Product;
  @HostListener('window:beforeunload', ['$event'])

  unloadNotification($event: any) {

    if (this.productDetailComponent.productForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.product = data['product'];
      if (this.product) {
        console.log(this.product);
      }
  });
}

}
