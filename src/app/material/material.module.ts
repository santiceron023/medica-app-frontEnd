import { NgModule } from '@angular/core';
import {
  MatTableModule, MatToolbarModule, MatIconModule, MatPaginatorModule, 
  MatButtonModule, MatSortModule, MatFormFieldModule, MatInputModule, 
  MatCardModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatMenuModule,
  MatDividerModule
} from '@angular/material'

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
  ]
})
export class MaterialModule { }
