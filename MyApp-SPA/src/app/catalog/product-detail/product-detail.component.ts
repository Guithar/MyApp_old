import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientAddComponent } from 'src/app/clients/client-add/client-add.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/_models/product';
import { ProductCategoryService } from 'src/app/_services/ProductCategory.service';
import { ProductCategory } from 'src/app/_models/productCategory';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  action: string;
  productParams: any = {};
  ListOfProducts: Product[];
  Categories: ProductCategory[];
  @Input() product: Product;

  constructor( private alertify: AlertifyService, private productService: ProductService,
    private router: Router, private formBuilder: FormBuilder,
    private categoryService: ProductCategoryService) { }


    productForm = this.formBuilder.group({
      id: [{value: ''}, Validators.required],
      tenantId: [{value: '', disabled: true}, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      productCategoryId: ['', Validators.required],
      productCategoryName: ['', Validators.required],
      productCategoryDescription: ['', Validators.required],
      isActive: ['', Validators.required],
      isDeleted: [{value: '', disabled: true}, Validators.required],
      createdOn: [{value: '', disabled: true}, Validators.required],
      updateOn: [{value: '', disabled: true}, Validators.required],
      deletedOn: [{value: '', disabled: true}, Validators.required],
      createdBy: [{value: '', disabled: true}, Validators.required],
      updateBy: [{value: '', disabled: true}, Validators.required],
      deletedBy: [{value: '', disabled: true}, Validators.required]
    });
  ngOnInit() {
    if (this.product) {
      this.getCategories();
      this.productForm.patchValue(this.product);
      console.log(this.product);
      console.log(this.productForm.value);
      }

  }

  onSubmit() {
    if (this.product) {
      this.updateProduct();
    } else {
       this.createProduct();
    }
  }

  updateProduct() {
    console.log('updateProduct()');
    console.log(this.productForm.value);
    this.productService.updateProduct(this.product.id, this.productForm.value).subscribe(() => {
      this.alertify.success('Product updated successfully');
      this.product = this.productForm.value;
      this.resetForm();
    }, error => {
      this.alertify.error(error);
    });
  }
  createProduct() {
    console.log('createProduct()');

  }

  deleteProduct() {
    this.alertify.confirm('Delete product', 'Are you sure you want to delete this product?', () => {
      console.log('deleteProduct()');
      console.log(this.productForm.value);
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.alertify.success('Product has been deleted');
        this.router.navigate(['products']);
      }, () => {
        this.alertify.error('Failed to delete product');
      });
    });
  }
  resetForm() {
    if (this.product) {
      this.productForm.reset(this.product);
    } else {
      this.alertify.confirm('Reset form', 'Are you sure you want to reset this form?', () => {
        this.productForm.reset();
      });
    }
  }
  getCategories() {
    this.categoryService.getCategories().subscribe (response => {
      this.Categories = response;
     }, error => {
        this.alertify.error(error);
     });
    }
  getProductsOfCategory(categoryId: number) {
    console.log('getProductsOfCategory ', categoryId);
    this.productParams.categoryId = categoryId;
    this.productService.getProducts(this.productParams).subscribe (response => {
      this.ListOfProducts = response;
     }, error => {
        this.alertify.error(error);
     });
  }

}

