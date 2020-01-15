import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Examen } from 'src/app/feature/examen/shared/examen';
import { ExamenService } from 'src/app/feature/examen/service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  dataSource: MatTableDataSource<Examen>;
  examenes: Examen[];
  //definicion para tabla dinamica -> https://stackblitz.com/edit/dynamic-columns-mat-table
  columns = [
    { columnDef: 'idExamen', header: 'Id.', cell: (element: Examen) => `${element.idExamen}` },
    { columnDef: 'nombre', header: 'Nombre', cell: (element: Examen) => `${element.nombre}` },
    { columnDef: 'descripcion', header: 'Weight', cell: (element: Examen) => `${element.descripcion}` },
    { columnDef: 'acciones' }
  ];
  displayedColumns: string[] = this.columns.map(c => c.columnDef);

  @ViewChild(MatSort, { static: false })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private exService: ExamenService,
    private snack: MatSnackBar) {
  }

  ngOnInit() {
    this.listar();

    this.exService.examenCambio.subscribe(
      (data: Examen[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

    this.exService.mensajeCambio.subscribe(
      (data: string) => {
        this.snack.open(data, 'AVISO',
          {
            duration: 2000
          });
      });

  }

  listar() {
    this.exService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    );
  }

  eliminar(id) {
    this.exService.eliminar(id).subscribe((data) => {
      this.exService.listar().subscribe(data => {
        this.exService.examenCambio.next(data);
        this.exService.mensajeCambio.next('SE ELIMINÓ');
      });
    }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
