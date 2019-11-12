import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  @Input() client: Client;

  constructor(private alertify: AlertifyService, private clientService: ClientService,
    private router: Router, private formBuilder: FormBuilder) { }

  clientForm =  this.formBuilder.group({
    id: ['', Validators.required],
    tenantId: ['', Validators.required],
   fistName: ['', Validators.required],
   lastName: ['', Validators.required],
   fullName: ['', Validators.required],
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
    isDeleted: ['', Validators.required],
    createdOn: ['', Validators.required],
    updatedOn: ['', Validators.required],
    deletedOn: ['', Validators.required],
    createdBy: ['', Validators.required],
    updatedBy: ['', Validators.required],
    deletedBy: ['', Validators.required]
  });

  ngOnInit() {
    if (this.client) {
    this.clientForm.patchValue(this.client);
    console.log(this.client);
    console.log(this.clientForm.value);
    }

  }
  onSubmit() {
    if (this.client) {
      this.updateClient();
    } else {
       this.createClient();
    }
  }
  updateClient() {
    this.clientService.updateClient(this.client.id, this.clientForm.value).subscribe(() => {
      this.alertify.success('Client updated successfully');
      this.client = this.clientForm.value;
      this.resetForm();
    }, error => {
      this.alertify.error(error);
    });
  }
  createClient() {
      this.clientService.createClient(this.clientForm.value)
    .subscribe((client: Client) => {
      this.client = client;
      this.alertify.success('Client created successfully');
      this.router.navigate(['clients/', client.id]);
    }, error => {
      this.alertify.error(error);
    });

  }
  deleteClient() {
    this.alertify.confirm('Delete client', 'Are you sure you want to delete this client?', () => {
      this.clientService.deleteClient(this.client.id).subscribe(() => {
        this.alertify.success('Client has been deleted');
        this.router.navigate(['clients']);
      }, () => {
        this.alertify.error('Failed to delete client');
      });
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
