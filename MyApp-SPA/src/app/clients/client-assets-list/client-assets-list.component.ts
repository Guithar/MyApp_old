import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/_models/client';
import { AssetService } from 'src/app/_services/asset.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig, MatTable } from '@angular/material';
import { Asset } from 'src/app/_models/asset';
import { ClientAssetDetailComponent } from '../client-asset-detail/client-asset-detail.component';

@Component({
  selector: 'app-client-assets-list',
  templateUrl: './client-assets-list.component.html',
  styleUrls: ['./client-assets-list.component.css']
})

export class ClientAssetsListComponent implements OnInit {
  @Input()
  clientId: number;
  assets: Asset[];

  constructor(private alertify: AlertifyService, private assetService: AssetService,
    private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

    dataSource: MatTableDataSource<Asset>;
    displayedColumns: string[] = ['id', 'name', 'description', 'location', 'quantity',
        'isActive', 'manufacturedDate', 'installedDate', 'productId', 'productName', 'actions'];

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatTable, {static: true}) assetsListTable: MatTable<any>;


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assets = data['assets'].result;
      this.loadAssets();
    });
  }
  loadAssets() {
    this.assetService.getAssets(this.clientId)
      .subscribe((assets: Asset[]) => {
        this.assets = assets;
        this.dataSource = new MatTableDataSource(assets);
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
    this.assetService.updateAsset(asset.clientId,
      asset.id, asset).subscribe(() => {
          this.alertify.success('Asset updated successfully');
          // Update the table
        }, error => {
          this.alertify.error(error);
        });
  }
  addData(asset: Asset) {
    console.log('addData');
  }
  deleteData(asset: Asset) {
    console.log('deleteData');
  }
}
