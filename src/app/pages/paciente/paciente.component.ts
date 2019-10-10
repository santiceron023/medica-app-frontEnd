import { Paciente } from './../../_model/paciente';
import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource: MatTableDataSource<Paciente>;
  pacientes: Paciente[];
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];

  @ViewChild(MatSort, { static: false })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(private pacService: PacienteService,
              private snack:MatSnackBar) {
  }

  ngOnInit() {
    this.listar();

    this.pacService.pacienteCambio.subscribe(
      (data:Paciente[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.pacService.mensajeCambio.subscribe(
      (data:string) => {
      this.snack.open(data,'AVISO',
        {
          duration: 2000
        });
    });

  }

  listar() {
    this.pacService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    );
  }

  eliminar(id) {
    this.pacService.eliminar(id).subscribe((data) => {
      console.log(data);      
      this.pacService.listar().subscribe(data => {
        this.pacService.pacienteCambio.next(data);
        this.pacService.mensajeCambio.next('SE ELIMINÓ');
      });
    }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
