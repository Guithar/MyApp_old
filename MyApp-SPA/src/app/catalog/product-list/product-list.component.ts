import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { ClientAddComponent } from 'src/app/clients/client-add/client-add.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductAddComponent } from '../product-add/product-add.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['select', 'id', 'productCategoryName', 'name', 'description', 'isActive'];
  selection = new SelectionModel<Product>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private productService: ProductService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = data['products'].result;
      this.loadProducts();
    });
}

  loadProducts() {
    console.log('loadProducts()');
    this.productService.getProducts()
    .subscribe((products: Product[]) => {
      this.products = products;
      this.dataSource = new MatTableDataSource(products);
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
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }



    openDialog(action: string, obj: any) {
    obj.action = action;
  const dialogConfig = new MatDialogConfig<any>();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = obj;

  const dialogRef = this.dialog.open(ProductAddComponent, dialogConfig);

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
  editProduct(row: Product) {
    this.router.navigate(['products/' + row.id]);
  }

  addData(product: Product) {
    console.log('addData');
    console.log(product);
    this.productService.createProduct(product).subscribe(() => {
          this.alertify.success('Product created successfully');
          this.loadProducts();
        }, error => {
          this.alertify.error('error ' + error);
        });
  }
  deleteData(product: Product) {
    console.log('deleteData');
  }
  updateData(product: Product) {
    console.log('updateData');
  }

}
