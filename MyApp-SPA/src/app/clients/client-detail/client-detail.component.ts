import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  constructor(private alertify: AlertifyService, private clientService: ClientService,
    private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private userService: UserService) { }

  client: Client;
  newClientFlag: boolean;
  clientForm =  this.formBuilder.group({
    company: ['', Validators.required],
    nif: ['', Validators.required],
    adress: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    country: ['', Validators.required]
  });

  @HostListener('window:beforeunload', ['$event'])

  unloadNotification($event: any) {
    if (this.clientForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
      this.route.data.subscribe(data => {
      this.client = data['client'];
        if (this.client) {
          console.log(this.client);
          this.loadFormData();
        }
    });
  }
  loadFormData() {
    this.clientForm.patchValue(this.client);
  }
  onSubmit() {
    console.log('onSubmit()');
    if (this.client) {
      console.log('updateClient()');
      console.log(this.clientForm.value);
      this.updateClient();
    } else {
      console.log('createClient()');
      console.log(this.clientForm.value);
       this.createClient();
    }
  }

  updateClient() {
    console.log(this.clientForm.value);
    this.clientService.updateClient(this.client.id, this.clientForm.value).subscribe(next => {
      this.alertify.success('Client updated successfully');
       this.clientForm.reset(this.clientForm.value);
    }, error => {
      this.alertify.error(error);
    });
  }
  createClient() {
      this.clientService.createClient(this.clientForm.value)
    .subscribe((client: Client) => {
      this.client = client;
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
      }, error => {
        this.alertify.error('Failed to delete client');
      });
    });
  }
  resetForm() {
    this.clientForm.reset();
  }

}
