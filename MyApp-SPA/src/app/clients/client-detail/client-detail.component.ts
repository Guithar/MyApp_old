import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  client: Client;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private alertify: AlertifyService, private clientService: ClientService,
    private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.client = data['client'];
      console.log(this.client);
    });
  }
  updateClient() {
    console.log(this.client);
    this.clientService.updateClient(this.client.id, this.client).subscribe(next => {
      this.alertify.success('Profile updated successfully');
       this.editForm.reset(this.client);
       console.log(this.client);
    }, error => {
      this.alertify.error(error);
    });
  }


}
