import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientAddComponent } from 'src/app/clients/client-add/client-add.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductCategoryService } from 'src/app/_services/ProductCategory.service';
import { ProductCategory } from 'src/app/_models/productCategory';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  action: string;
  Categories: ProductCategory[];
  constructor(public dialogRef: MatDialogRef<ClientAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private alertify: AlertifyService,
     private productService: ProductService, private categoryService: ProductCategoryService,
    private router: Router, private formBuilder: FormBuilder) { }


    productForm = this.formBuilder.group({
      id: [{value: '', disabled: true}, Validators.required],
      tenantId: [{value: '', disabled: true}, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      productCategoryId: ['', Validators.required],
      productCategoryName: ['', Validators.required],
      productCategoryDescription: [{value: '', disabled: true}, Validators.required],
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
      this.getCategories();
      if (this.data) {
        this.action = this.data.action;
      }

    }
    onSubmit() {
      this.createProduct();
    }

    createProduct() {
      this.alertify.confirm( this.action + ' product', 'Are you sure you want to ' +
      this.action.toLowerCase() + ' this product?', () => {
       this.dialogRef.close({event: this.action, data: this.productForm.value});
      });

    }
    resetForm() {
        this.alertify.confirm('Reset form', 'Are you sure you want to cancel?', () => {

          this.dialogRef.close({event: 'Cancel', data: this.productForm.value});
        });
    }
    getCategories() {
      this.categoryService.getCategories().subscribe (response => {
        this.Categories = response;
       }, error => {
          this.alertify.error(error);
       });
      }


}
