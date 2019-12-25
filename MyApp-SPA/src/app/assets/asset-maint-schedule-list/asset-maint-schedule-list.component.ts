import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from 'src/app/_services/asset.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig, MatTable } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ClientAssetDetailModalComponent } from 'src/app/clients/client-asset-detail-modal/client-asset-detail-modal.component';
import { MaintScheduleAsset } from 'src/app/_models/maintScheduleAsset';
import { MaintScheduleAssetDetailModalComponent } from '../maint-schedule-asset-detail-modal/maint-schedule-asset-detail-modal.component';
import { MaintScheduleAssetService } from 'src/app/_services/maintScheduleAsset.service';

@Component({
  selector: 'app-asset-maint-schedule-list',
  templateUrl: './asset-maint-schedule-list.component.html',
  styleUrls: ['./asset-maint-schedule-list.component.css']
})
export class AssetMaintScheduleListComponent implements OnInit {
  assetId = this.currentRoute.snapshot.paramMap.get('assetId');
  maintScheduleAsset: MaintScheduleAsset[];

  constructor(private alertify: AlertifyService,
    private maintScheduleAssetService: MaintScheduleAssetService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private currentRoute: ActivatedRoute) { }

    dataSource: MatTableDataSource<MaintScheduleAsset>;


      displayedColumns: string[] = [
        'select',
        'isActive',
        'assetId',
        'maintScheduleId',
        'maintSchedule.name',
        // 'maintSchedule.description',
        'maintSchedule.monthsInterval',
        'lastInspectionDate',
        'nextInspectionDate',
        'lastResult',
        'actions'];

    selection = new SelectionModel<MaintScheduleAsset>(true, []);

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatTable, {static: true}) assetsListTable: MatTable<any>;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.maintScheduleAsset = data['MaintScheduleAssets'];
      this.loadMaintScheduleAssets();
    });
  }
  loadMaintScheduleAssets() {
        this.dataSource = new MatTableDataSource(this.maintScheduleAsset);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.maintScheduleAsset);
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
  checkboxLabel(row?: MaintScheduleAsset): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.maintScheduleId + 1}`;
  }


  openDialog(action: string, obj: any) {
     obj.action = action;
    const dialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = obj;
     const dialogRef = this.dialog.open(MaintScheduleAssetDetailModalComponent, dialogConfig);

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

  updateData(maintScheduleAsset: any) {
    console.log('updateData');
    console.log(maintScheduleAsset);
    this.maintScheduleAssetService.updateMaintScheduleAsset(
      maintScheduleAsset.clientId,
      maintScheduleAsset.assetId,
      maintScheduleAsset.maintScheduleId,
      maintScheduleAsset).subscribe(() => {
          this.alertify.success('Maintenance Schedule has been updated successfully');
          this.loadMaintScheduleAssets();
        }, error => {
          this.alertify.error(error);
        });
  }
  addData(maintScheduleAsset: MaintScheduleAsset) {
    console.log('addData');
    console.log(maintScheduleAsset);
    this.maintScheduleAssetService.createMaintScheduleAsset(
      maintScheduleAsset.clientId,
      maintScheduleAsset.assetId,
      maintScheduleAsset).subscribe(() => {
          this.alertify.success('Maintenance Schedule has been created successfully');
          this.loadMaintScheduleAssets();
        }, error => {
          this.alertify.error(error);
        });
  }
  deleteData(maintScheduleAsset: MaintScheduleAsset) {
    console.log('deleteData');
    console.log(maintScheduleAsset);
    this.maintScheduleAssetService.deleteMaintScheduleAsset(
      maintScheduleAsset.clientId,
      maintScheduleAsset.assetId,
      maintScheduleAsset.maintScheduleId).subscribe(() => {
          this.alertify.success('Maintenance Schedule has been deleted successfully');
          this.loadMaintScheduleAssets();
        }, error => {
          this.alertify.error(error);
        });

  }
}
