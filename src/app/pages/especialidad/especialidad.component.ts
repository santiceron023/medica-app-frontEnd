import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from 'src/app/_service/especialidad.service';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  dataSource: MatTableDataSource<Especialidad>;
  examenes: Especialidad[];
  displayedColumns: string[] = ['id', 'nombre','acciones'];

  @ViewChild(MatSort, { static: false })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(private espService: EspecialidadService
              , private route:ActivatedRoute
              , private snack:MatSnackBar) {
  }

  ngOnInit() {
    this.listar();

    this.espService.especialidadCambio.subscribe(
      (data:Especialidad[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.espService.mensajeCambio.subscribe(
      (data:string) => {
      this.snack.open(data,'AVISO',
        {
          duration: 2000
        });
    });

  }

  listar() {
    this.espService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    );
  }

  eliminar(id) {
    this.espService.eliminar(id).subscribe((data) => {
      console.log(data);      
      this.espService.listar().subscribe(data => {
        this.espService.especialidadCambio.next(data);
        this.espService.mensajeCambio.next('SE ELIMINÓ');
      });
    }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
