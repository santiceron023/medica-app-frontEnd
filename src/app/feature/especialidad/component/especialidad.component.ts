import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Especialidad } from 'src/app/feature/especialidad/shared/especialidad';
import { EspecialidadService } from 'src/app/feature/especialidad/service/especialidad.service';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  dataSource: MatTableDataSource<Especialidad>;
  examenes: Especialidad[];
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  @ViewChild(MatSort, { static: false })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
      private espService: EspecialidadService
    , public route: ActivatedRoute
    , private snack: MatSnackBar) {
  }

  ngOnInit() {
    this.listar();

    this.espService.especialidadCambio.subscribe(
      (data: Especialidad[]) => {
        this.organizarData(data);
      });

    this.espService.mensajeCambio.subscribe(
      (data: string) => {
        this.snack.open(data, 'AVISO',
          {
            duration: 2000
          });
      });

  }

  organizarData(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  listar() {
    this.espService.listar().subscribe((data) => {
      this.organizarData(data);
    }
    );
  }

  eliminar(id) {
    this.espService.eliminar(id).subscribe((data) => {
      this.espService.listar().subscribe(lista => {
        this.espService.especialidadCambio.next(lista);
        this.espService.mensajeCambio.next('SE ELIMINÓ');
      });
    }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
