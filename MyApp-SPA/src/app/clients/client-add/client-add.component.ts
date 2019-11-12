import { Component, OnInit, Input, Inject } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  @Input() client: Client;
  action: string;
  constructor(public dialogRef: MatDialogRef<ClientAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private alertify: AlertifyService,
     private clientService: ClientService,
    private router: Router, private formBuilder: FormBuilder,
    ) { }

  clientForm =  this.formBuilder.group({
    id: [{value: '', disabled: true}, Validators.required],
    tenantId: [{value: '', disabled: true}, Validators.required],
   fistName: ['', Validators.required],
   lastName: ['', Validators.required],
   fullName: [{value: '', disabled: true}, Validators.required],
    company: ['', Validators.required],
    nif: ['', Validators.required],
    jobTitle: ['', Validators.required],
    adress: ['', Validators.required],
    city: ['', Validators.required],
    state_Province: ['', Validators.required],
    country: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    observations: ['', Validators.required],
    isDeleted: [{value: '', disabled: true}, Validators.required],
    createdOn: [{value: '', disabled: true}, Validators.required],
    updateOn: [{value: '', disabled: true}, Validators.required],
    deletedOn: [{value: '', disabled: true}, Validators.required],
    createdBy: [{value: '', disabled: true}, Validators.required],
    updateBy: [{value: '', disabled: true}, Validators.required],
    deletedBy: [{value: '', disabled: true}, Validators.required]
  });

  ngOnInit() {
    if (this.data) {
      this.action = this.data.action;
    }

  }
  onSubmit() {
    this.createClient();
  }

  createClient() {
    this.alertify.confirm( this.action + ' client', 'Are you sure you want to ' +
    this.action.toLowerCase() + ' this client?', () => {
     this.dialogRef.close({event: this.action, data: this.clientForm.value});
    });

  }
  resetForm() {
    if (this.client) {
      this.clientForm.reset(this.client);
    } else {
      this.alertify.confirm('Reset form', 'Are you sure you want to reset this form?', () => {
        this.clientForm.reset();
      });
    }
  }
}
