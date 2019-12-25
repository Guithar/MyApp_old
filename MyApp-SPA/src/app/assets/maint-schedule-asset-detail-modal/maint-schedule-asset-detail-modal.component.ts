import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductService } from 'src/app/_services/product.service';
import { ProductCategoryService } from 'src/app/_services/ProductCategory.service';
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
  maintScheduleAssetName: string;
  maintScheduleAssetDescription: string;
  maintScheduleAssetMonthsInterval: number;
  constructor(
    public dialogRef: MatDialogRef<MaintScheduleAssetDetailModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder,
  private alertify: AlertifyService,
  private maintScheduleService: MaintScheduleService) {
   }

    MaintScheduleAssetForm =  this.formBuilder.group({
          'assetId': ['', Validators.required],
          'maintScheduleId': ['', Validators.required],
          'clientId': ['', Validators.required],
          'nextInspectionDate': ['', Validators.required],
          'isActive': ['', Validators.required]
      });

  ngOnInit() {
    if (!this.data) {
        console.log('No data');
    }
    console.log('this.data: ' , this.data);


    this.action = this.data.action;
      switch (this.data.action) {
        case 'Add':
            this.getMaintSchedules(0);
            break;
        case 'Delete':
            this.MaintScheduleAssetForm.patchValue(this.data);
            this.MaintScheduleAssetForm.disable();
            break;
        case 'Update':
          console.log('update productCategoryId:', this.data.productCategoryId );
            this.getMaintSchedules(this.data.productCategoryId);
            this.MaintScheduleAssetForm.patchValue(this.data);
          break;

        default:
            console.log('Error');
          break;
    }

    console.log('this.data.productCategoryId: ', this.data.productCategoryId);
    console.log('this.data: ', this.data);
    console.log('assetForm.value ', this.MaintScheduleAssetForm.value);
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  submit() {
    this.alertify.confirm( this.action + ' asset', 'Are you sure you want to ' +
    this.action.toLowerCase() + ' this asset?', () => {
      this.dialogRef.close({event: this.action, data: this.MaintScheduleAssetForm.value});
    });
  }
  getMaintSchedules(productCategoryId: number) {
    console.log('getMaintSchedules: ', productCategoryId);
    this.MaintScheduleParams.ProductCategoryId = productCategoryId;
    this.maintScheduleService.getMaintSchedules(this.MaintScheduleParams).subscribe(response => {
      this.ListOfMaintSchedules = response;
     }, error => {
        this.alertify.error(error);
     });
  }
  // ShowMaintScheduleAssetDetail(id: number)  {

  //   console.log (id);
  //   this.maintScheduleAssetMonthsInterval = this.ListOfMaintSchedules
  //     .find(x => x.id === id).monthsInterval;
  //   this.maintScheduleAssetName = this.ListOfMaintSchedules
  //     .find(x => x.id === id).name;
  //   this.maintScheduleAssetDescription = this.ListOfMaintSchedules
  //     .find(x => x.id === id).description;
  // }
}
