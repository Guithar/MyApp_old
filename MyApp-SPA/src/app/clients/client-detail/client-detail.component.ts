import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: Client;
  constructor(private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.client = data['client'];
      console.log(this.client);
    });
  }

}
