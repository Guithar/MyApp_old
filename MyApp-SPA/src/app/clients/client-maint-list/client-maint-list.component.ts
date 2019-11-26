import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MaintForList } from 'src/app/_models/maintForList';
import { MaintService } from 'src/app/_services/maint.service';
import { AssetService } from 'src/app/_services/asset.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialogConfig, MatDialog } from '@angular/material';
import { ClientAssetDetailComponent } from '../client-asset-detail/client-asset-detail.component';


@Component({
  selector: 'app-client-maint-list',
  templateUrl: './client-maint-list.component.html',
  styleUrls: ['./client-maint-list.component.css']
})
export class ClientMaintListComponent implements OnInit {
  @Input() clientId: number;
  maints: MaintForList[];


  constructor(private maintService: MaintService,
    private assetsService: AssetService, private router: Router,
    private route: ActivatedRoute, private dialog: MatDialog) { }

    dataSource: MatTableDataSource<MaintForList>;

    displayedColumns: string[] = [ 'isActive', 'assetId', 'product.productCategoryName', 'product.name',
         'maintScheduleName', 'location', 'quantity', 'monthsInterval',
        'manufacturedDate', 'lastRev', 'lastResult', 'nextRev',
         'actions'];
    columnsToDisplay: string[] = this.displayedColumns.slice();

        @ViewChild(MatSort, {static: true}) sort: MatSort;
        @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
        @ViewChild(MatTable, {static: true}) assetsListTable: MatTable<any>;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.maints = data['maints'];
    });

    this.loadMaints();
  }

  loadMaints() {
    this.maintService.getMaints(this.clientId)
    .subscribe({
      next: (result: any) => {
        console.log('result');
        this.maints = result;
        console.log(this.maints);
      },
      error: (err: any) => {
        console.log('error');
        console.log(err);
      },
      complete: () => {
      console.log('complete');
      this.dataSource = new MatTableDataSource(this.maints);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      }
      });
  }
  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
   const dialogConfig = new MatDialogConfig<any>();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.data = obj;
    const dialogRef = this.dialog.open(ClientAssetDetailComponent, dialogConfig);

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

 updateData(asset: any) {
   console.log('updateData');
 }
 addData(maints: MaintForList) {
   console.log('addData');
 }
 deleteData(maints: MaintForList) {
   console.log('deleteData');
 }
}
