import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { Asset } from 'src/app/_models/asset';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {

  @Input() clientId: number;
  assets: Asset[];

  constructor(private route: ActivatedRoute) { }

    dataSource: MatTableDataSource<Asset>;
    allColumns: string[] = [
      'select', 'isActive', 'id',
      'client.adress', 'client.city', 'client.company',
      'client.country', 'client.email', 'client.id',
      'client.jobTitle', 'client.nif', 'client.observations',
      'client.phone', 'client.state_Province', 'client.tenantId',
      'client.ziP_PostalCode',
      'product.id', 'product.name', 'product.description', 'product.productCategoryId',
      'product.productCategoryName', 'location', 'quantity',
      'inspection.maintScheduleId', 'inspection.name', 'inspection.description',
      'inspection.monthsInterval', 'inspection.lastinspectionDate', 'inspection.lastResult',
      'inspection.nextInspectionDate',
      'actions'];




      displayedColumns: string[] = [
        'select', 'client.company', 'isActive', 'id',
         'product.name',
         'location', 'quantity',
        'inspections', 'inspections.lastResult', 'inspections.nextInspectionDate',
        'actions'];

    selection = new SelectionModel<Asset>(true, []);

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatTable, {static: true}) assetsListTable: MatTable<any>;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assets = data['assets'];
      this.loadAssets();
    });
  }
  loadAssets() {
        this.dataSource = new MatTableDataSource(this.assets);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.assets);
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

