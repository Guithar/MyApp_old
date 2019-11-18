import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { catchError } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/_services/ProductCategory.service';
import { ProductCategory } from 'src/app/_models/productCategory';


@Component({
  selector: 'app-client-asset-detail',
  templateUrl: './client-asset-detail.component.html',
  styleUrls: ['./client-asset-detail.component.css']
})
export class ClientAssetDetailComponent implements OnInit  {
    action: string;
    Categories: ProductCategory[];
    ListOfProducts: Product[];
    productParams: any = {};

    constructor(public dialogRef: MatDialogRef<ClientAssetDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private formBuilder: FormBuilder,
    private alertify: AlertifyService, private categoryService: ProductCategoryService,
    private productService: ProductService) {
     }

      assetForm =  this.formBuilder.group({
      id: ['' , Validators.required],
      clientId: ['', Validators.required],
      tenantId: ['', Validators.required],
      // name: [{value: '', disabled: false}, Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      quantity: ['', Validators.required],
      manufacturedDate: ['', Validators.required],
      installedDate: ['', Validators.required],
      productProductCategoryId: ['', Validators.required], 
      productId: ['', Validators.required],
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
      this.action = this.data.action;
        switch (this.data.action) {
          case 'Add':
              this.assetForm.controls['id'].disable();
              this.assetForm.controls['clientId'].disable();
              this.assetForm.controls['tenantId'].disable();
              break;
          case 'Delete':
              this.assetForm.patchValue(this.data);
              this.assetForm.disable();
              break;
          case 'Update':
              this.assetForm.patchValue(this.data);
              this.productParams.categoryId = this.data.productProductCategoryId;
              this.getProductsOfCategory(this.productParams.categoryId);
            break;

          default:
              console.log('Error');
            break;
        }
      console.log('this.data: ', this.data);
      console.log(this.assetForm.value);
    }

    closeDialog() {
      this.dialogRef.close({event: 'Cancel'});
    }

    submit() {
      this.alertify.confirm( this.action + ' asset', 'Are you sure you want to ' +
      this.action.toLowerCase() + ' this asset?', () => {
        this.dialogRef.close({event: this.action, data: this.assetForm.value});
      });
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
