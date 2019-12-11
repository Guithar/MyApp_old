import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Product } from 'src/app/_models/product';
import { ProductCategoryService } from 'src/app/_services/ProductCategory.service';
import { ProductCategory } from 'src/app/_models/productCategory';
import { ActivatedRoute } from '@angular/router';
import { Asset } from 'src/app/_models/asset';
import { ProductService } from 'src/app/_services/product.service';
import {Location} from '@angular/common';


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
    asset:  Asset;

    constructor (private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private categoryService: ProductCategoryService,
    private productService: ProductService,
    private currentRoute: ActivatedRoute,
    private _location: Location) {
     }

      assetForm =  this.formBuilder.group({
        id: ['' , Validators.required],
        tenantId: ['', Validators.required],
        location: ['', Validators.required],
        quantity: ['', Validators.required],
        manufacturedDate: ['', Validators.required],

        product: this.formBuilder.group({
          id: [{value: '', disabled: false}, Validators.required],
          name: [{value: '', disabled: false}, Validators.required],
          description: [{value: '', disabled: false}, Validators.required],
          productCategoryId: ['', Validators.required],
          productCategoryName: [{value: '', disabled: false}, Validators.required],
        }),
        inspections: this.formBuilder.group({
          maintScheduleId: ['', Validators.required],
          name: [{value: '', disabled: false}, Validators.required],
          description: [{value: '', disabled: false}, Validators.required],
          monthsInterval: ['', Validators.required],
          lastResult: ['', Validators.required],
          lastInspectionDate: ['', Validators.required],
          nextInspectionDate: ['', Validators.required]
        }),
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
      const assetId = this.currentRoute.snapshot.paramMap.get('assetId');
      console.log (assetId);
      if (assetId == null) {
        this.action = 'new';
      } else {
        this.action = 'edit';

        this.currentRoute.data.subscribe(data => {
          this.asset = data['asset'];
          console.log('this.asset');
          console.log(this.asset);
          this.loadAsset();

        });
      }
      console.log (this.action);
    }

    loadAsset() {
      console.log('asset' , this.asset);
      this.assetForm.patchValue(this.asset);
      this.getCategories();
      this.getProductsOfCategory(this.asset.product.productCategoryId);
      console.log('assetForm', this.assetForm.value);
    }
    submit() {
      this.alertify.confirm( this.action + ' asset', 'Are you sure you want to ' +
      this.action.toLowerCase() + ' this asset?', () => {
        // submit
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
    backClicked() {
      this._location.back();
    }
}
