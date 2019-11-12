import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { ClientService } from 'src/app/_services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig} from '@angular/material';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { ClientAddComponent } from '../client-add/client-add.component';

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
  private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
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

  
  openDialog(action: string, obj: any) {
    obj.action = action;
   const dialogConfig = new MatDialogConfig<any>();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.data = obj;

    const dialogRef = this.dialog.open(ClientAddComponent, dialogConfig);

   dialogRef.afterClosed().subscribe(result => {
     console.log('afterClosed result: ' , result);
     if (result.event === 'Add') {
       this.addData(result.data);
     } else if (result.event === 'Update') {
       this.updateData(result.data);
     } else if (result.event === 'Delete') {
       this.deleteData(result.data);
     }
   });
  }

    addData(client: Client) {
      console.log('addData');
      console.log(client);
      this.clientService.createClient(client).subscribe(() => {
            this.alertify.success('Client created successfully');
            this.loadClients();
          }, error => {
            this.alertify.error('error ' + error);
          });
    }
    deleteData(client: Client) {
      console.log('deleteData');
    }
    updateData(client: any) {
      console.log('updateData');
    }

}


