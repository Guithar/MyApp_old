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
    formDisabled: boolean;
    constructor(public dialogRef: MatDialogRef<ClientAssetDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private formBuilder: FormBuilder,
    private assetService: AssetService, private alertify: AlertifyService) { }


    assetForm =  this.formBuilder.group({
      id: [{value: '' } , Validators.required],
      clientId: ['', Validators.required],
      clientUserId: ['', Validators.required],
      clientCompany: ['', Validators.required],
      name: [{value: '', disabled: false}, Validators.required],
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
        this.action = this.data.action;
        if (this.action === 'Delete'){
          this.assetForm.disable();

        }
        this.assetForm.patchValue(this.data);
      }

    }

    closeDialog() {
      console.log('CloseDialog');
      this.dialogRef.close({event: 'Cancel'});
    }

    submit() {
      console.log('Submit');
      this.alertify.confirm( this.action + ' asset', 'Are you sure you want to ' +
      this.action.toLowerCase() + ' this asset?', () => {
        this.dialogRef.close({event: this.action, data: this.assetForm.value});
      });
    }
}
