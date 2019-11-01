import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatToolbarModule,
        MatTabsModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
