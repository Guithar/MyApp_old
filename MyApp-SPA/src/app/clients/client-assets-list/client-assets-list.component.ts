import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from 'src/app/_services/asset.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig, MatTable } from '@angular/material';
import { Asset } from 'src/app/_models/asset';
import { ClientAssetDetailComponent } from '../client-asset-detail/client-asset-detail.component';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-client-assets-list',
  templateUrl: './client-assets-list.component.html',
  styleUrls: ['./client-assets-list.component.css'],
})

export class ClientAssetsListComponent implements OnInit {
  @Input() clientId: number;
  assets: Asset[];

  constructor(private alertify: AlertifyService, private assetService: AssetService,
    private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

    dataSource: MatTableDataSource<Asset>;
    displayedColumns: string[] = ['select', 'isActive', 'assetId', 'product.productCategoryName', 'product.name',
    'maintScheduleName', 'location', 'quantity', 'monthsInterval',
   'manufacturedDate', 'lastRev', 'lastResult', 'nextRev',
    'actions'];
    selection = new SelectionModel<Asset>(true, []);

    
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
        console.log(assets);
    }, error => {
      this.alertify.error(error);
    });
  }
  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Asset): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.assetId + 1}`;
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
    console.log(asset);
    // this.assetService.updateAsset(asset.clientId,
    //   asset.id, asset).subscribe(() => {
    //       this.alertify.success('Asset updated successfully');
    //       this.loadAssets();
    //     }, error => {
    //       this.alertify.error(error);
    //     });
  }
  addData(asset: Asset) {
    console.log('addData');
    console.log(asset);
    // this.assetService.createAsset(this.clientId,
    //   asset).subscribe(() => {
    //       this.alertify.success('Asset created successfully');
    //       this.loadAssets();
    //     }, error => {
    //       this.alertify.error('error ' + error);
    //     });
  }
  deleteData(asset: Asset) {
    console.log('deleteData');
    console.log(asset);
    // this.assetService.deleteAsset(asset.clientId,
    //   asset.id).subscribe(() => {
    //       this.alertify.success('Asset deleted successfully');
    //       this.loadAssets();
    //     }, error => {
    //       this.alertify.error(error);
    //     });
  }
}
