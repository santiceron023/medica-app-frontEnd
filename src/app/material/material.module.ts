import { NgModule } from '@angular/core';
import {
  MatTableModule, MatToolbarModule, MatIconModule, MatPaginatorModule, 
  MatButtonModule, MatSortModule, MatFormFieldModule, MatInputModule, 
  MatCardModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatMenuModule,
  MatDividerModule,
  MatDialogModule
} from '@angular/material'
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [],
  imports: [    
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    //side
    MatSidenavModule,

    //toast
    MatSnackBarModule
    , MatSidenavModule
    , MatMenuModule
    , MatDividerModule

    ,MatDialogModule

    // , CdkTableModule
  ],
  //para el padre module
  exports:[
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule
    , MatSidenavModule
    , MatMenuModule
    , MatDividerModule
    , MatDialogModule

    // , CdkTableModule
  ]
})
export class MaterialModule { }
