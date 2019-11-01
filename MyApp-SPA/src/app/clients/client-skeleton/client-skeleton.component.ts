import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { Client } from 'src/app/_models/client';
import { ClientDetailComponent } from '../client-detail/client-detail.component';


@Component({
  selector: 'app-client-skeleton',
  templateUrl: './client-skeleton.component.html',
  styleUrls: ['./client-skeleton.component.css']
})
export class ClientSkeletonComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  @ViewChild ('clientDetailComponent', {static: true})
  clientDetailComponent: ClientDetailComponent;

    client: Client;
  @HostListener('window:beforeunload', ['$event'])

  unloadNotification($event: any) {
   
    if (this.clientDetailComponent.clientForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.client = data['client'];
      if (this.client) {
        console.log(this.client);
      }
  });
}

}
