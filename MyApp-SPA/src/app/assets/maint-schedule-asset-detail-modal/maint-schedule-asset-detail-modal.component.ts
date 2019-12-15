import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { catchError } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/_services/ProductCategory.service';
import { ProductCategory } from 'src/app/_models/productCategory';
import { MaintScheduleService } from 'src/app/_services/maintSchedule.service';
import { MaintSchedule } from 'src/app/_models/maintSchedule';


@Component({
  selector: 'app-maint-schedule-asset-detail-modal',
  templateUrl: './maint-schedule-asset-detail-modal.component.html',
  styleUrls: ['./maint-schedule-asset-detail-modal.component.css']
})
export class MaintScheduleAssetDetailModalComponent implements OnInit {

  action: string;
  MaintScheduleParams: any = {};
  ListOfMaintSchedules: MaintSchedule[];

  constructor(
    public dialogRef: MatDialogRef<MaintScheduleAssetDetailModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder,
  private alertify: AlertifyService, 
  private categoryService: ProductCategoryService,
  private productService: ProductService,
  private maintScheduleService: MaintScheduleService) {
   }

    MaintScheduleAssetForm =  this.formBuilder.group({
      'maintScheduleId': ['', Validators.required],
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'monthsInterval': ['', Validators.required],
      'lastInspectionDate': ['', Validators.required],
      'nextInspectionDate': ['', Validators.required],
      'lastResult': ['', Validators.required],
      'isActive': ['', Validators.required]
    });

  ngOnInit() {
    if (!this.data) {
        console.log('No data');
    }
    console.log('this.data: ' , this.data);
    this.getMaintSchedules(this.data.productCategoryId);

    this.action = this.data.action;
      switch (this.data.action) {
        case 'Add':
            this.MaintScheduleAssetForm.controls['lastInspectionDate'].disable();
            this.MaintScheduleAssetForm.controls['lastResult'].disable();
            break;
        case 'Delete':
            this.MaintScheduleAssetForm.patchValue(this.data);
            this.MaintScheduleAssetForm.disable();
            break;
        case 'Update':
            this.MaintScheduleAssetForm.patchValue(this.data);
          break;

        default:
            console.log('Error');
          break;
    }

    console.log('this.data.productCategoryId: ', this.data.productCategoryId);
    console.log('this.data: ', this.data);
    console.log('assetForm.value ', this.MaintScheduleAssetForm .value);
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  submit() {
    this.alertify.confirm( this.action + ' asset', 'Are you sure you want to ' +
    this.action.toLowerCase() + ' this asset?', () => {
      this.dialogRef.close({event: this.action, data: this.MaintScheduleAssetForm .value});
    });
  }
  getMaintSchedules(productCategoryId: number) {
    console.log('getMaintSchedules: ', productCategoryId);
    this.MaintScheduleParams.ProductCategoryId = productCategoryId;
    this.maintScheduleService.getMaintSchedules(this.MaintScheduleParams).subscribe (response => {
      this.ListOfMaintSchedules = response;
     }, error => {
        this.alertify.error(error);
     });
  }
}
