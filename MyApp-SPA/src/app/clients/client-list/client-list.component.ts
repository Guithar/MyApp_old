import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { ClientService } from 'src/app/_services/client.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[];

  constructor(private clientService: ClientService, private alertify: AlertifyService,
  private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.clients = data['clients'].result;
        this.loadClients();
    });
  }
  loadClients() {
    this.clientService.getClients()
      .subscribe((clients: Client[]) => {
        this.clients = clients;
    }, error => {
      this.alertify.error(error);
    });
  }
}
