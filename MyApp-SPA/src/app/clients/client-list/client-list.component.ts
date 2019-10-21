import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { ClientService } from 'src/app/_services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})

export class ClientListComponent implements OnInit {

  clients: Client[];
  dataSource: MatTableDataSource<Client>;
  displayedColumns: string[] = ['id', 'company', 'nif', 'adress', 'city', 'state_Province', 'firstName', 'lastName'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private clientService: ClientService, private alertify: AlertifyService,
  private route: ActivatedRoute, private router: Router) {
  }

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
        this.dataSource = new MatTableDataSource(clients);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }, error => {
      this.alertify.error(error);
    });
  }
  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editClient(row: Client) {
      this.router.navigate(['clients/' + row.id]);
  }
  newClient() {
    this.router.navigate(['clients/new']);
  }
}


