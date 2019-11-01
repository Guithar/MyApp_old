import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Asset } from 'src/app/_models/asset';
import { AssetService } from 'src/app/_services/asset.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-client-asset-detail',
  templateUrl: './client-asset-detail.component.html',
  styleUrls: ['./client-asset-detail.component.css']
})
export class ClientAssetDetailComponent implements OnInit  {
    action: string;
    constructor(public dialogRef: MatDialogRef<ClientAssetDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private formBuilder: FormBuilder,
    private assetService: AssetService, private alertify: AlertifyService) { }


    assetForm =  this.formBuilder.group({
      id: ['', Validators.required],
      clientId: ['', Validators.required],
      clientUserId: ['', Validators.required],
      clientCompany: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      quantity: ['', Validators.required],
      isActive: ['', Validators.required],
      manufacturedDate: ['', Validators.required],
      installedDate: ['', Validators.required],
      productId: ['', Validators.required],
      productName: ['', Validators.required]
    });

    ngOnInit() {
      if (this.data) {
        // console.log('data previous delete the propertie action : ' , this.data);
        // console.log('data previous delete the propertie action : ' , this.data.action);
        this.action = this.data.action;
        // delete this.data.action; // delete this propertie
        this.assetForm.patchValue(this.data);
        console.log('data: ' , this.data);
        console.log('action: ' , this.action);
      }

    }
    closeDialog() {
      this.dialogRef.close({event: 'Cancel'});
    }

    submit() {
      this.dialogRef.close({event: this.action, data: this.assetForm.value});
    }
}
